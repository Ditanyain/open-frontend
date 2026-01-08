import { useCallback, useEffect, useState } from "react";
import { getAttempts } from "../api";
import type { AttemptItem, AttemptsFilter } from "../types";

interface UseAttemptsResult {
  data: AttemptItem[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAttempts(filters: AttemptsFilter): UseAttemptsResult {
  const [data, setData] = useState<AttemptItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { userId, tutorialId } = filters;

  const fetchData = useCallback(async () => {
    if (!Number.isFinite(userId) || !Number.isFinite(tutorialId)) {
      setLoading(false);
      setData(null);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const attempts = await getAttempts({ userId, tutorialId });
      setData(attempts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }, [userId, tutorialId]);

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
