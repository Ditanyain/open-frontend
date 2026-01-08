import { useState, useCallback } from "react";
import { createAttempt } from "../api";
import type { ApiError } from "@/lib/api/types";
import type { CreateAttemptData, CreateAttemptParams } from "../types";

interface UseCreateAttemptResult {
  data: CreateAttemptData | null;
  loading: boolean;
  error: string | null;
  run: (params: CreateAttemptParams) => Promise<CreateAttemptData | void>;
  reset: () => void;
}

export function useCreateAttempt(): UseCreateAttemptResult {
  const [data, setData] = useState<CreateAttemptData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async (params: CreateAttemptParams) => {
    try {
      setLoading(true);
      setError(null);

      const result = await createAttempt(params);
      setData(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan.";
      setError(message);

      throw err as ApiError;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    run,
    reset,
  };
}
