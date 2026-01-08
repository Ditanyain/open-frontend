import { useCallback, useEffect, useState } from "react";
import type { AttemptDetail } from "../types";
import { getAttemptDetail } from "../api";

interface UseAttemptDetailResult {
  data: AttemptDetail | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAttemptDetail(
  attemptId: string | undefined
): UseAttemptDetailResult {
  const [data, setData] = useState<AttemptDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!attemptId) {
      setLoading(false);
      setData(null);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const detail = await getAttemptDetail(attemptId);
      setData(detail);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil attempt."
      );
    } finally {
      setLoading(false);
    }
  }, [attemptId]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
