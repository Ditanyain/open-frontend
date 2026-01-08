import { useCallback, useState } from "react";
import { submitAttempt } from "../api";

interface UseSubmitAttemptResult {
  loading: boolean;
  error: string | null;
  run: () => Promise<void>;
  reset: () => void;
}

export function useSubmitAttempt(attemptId: string): UseSubmitAttemptResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await submitAttempt(attemptId);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [attemptId]);

  const reset = useCallback(() => {
    setError(null);
    setLoading(false);
  }, []);

  return { loading, error, run, reset };
}
