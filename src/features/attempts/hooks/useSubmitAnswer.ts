import { useCallback, useState } from "react";
import type { SubmitAnswerData, SubmitAnswerPayload } from "../types";
import { submitAttemptAnswer } from "../api";

interface UseSubmitAnswerParams {
  attemptId: string;
}

interface UseSubmitAnswerResult {
  data: SubmitAnswerData | null;
  loading: boolean;
  error: string | null;
  run: (payload: SubmitAnswerPayload) => Promise<SubmitAnswerData | void>;
  reset: () => void;
}

export function useSubmitAnswer(
  params: UseSubmitAnswerParams
): UseSubmitAnswerResult {
  const { attemptId } = params;

  const [data, setData] = useState<SubmitAnswerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (payload: SubmitAnswerPayload) => {
      try {
        setLoading(true);
        setError(null);

        const result = await submitAttemptAnswer(attemptId, payload);
        setData(result);
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Terjadi kesalahan.";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [attemptId]
  );

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
