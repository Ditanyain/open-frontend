const buildProgressKey = (userId: number, tutorialId: number) =>
  `progress:${userId}:${tutorialId}`;

export interface AttemptProgress {
  attemptId: string;
}

export const saveAttemptProgress = (
  userId: number,
  tutorialId: number,
  attemptId: string
) => {
  const key = buildProgressKey(userId, tutorialId);

  const payload: AttemptProgress = { attemptId };

  localStorage.setItem(key, JSON.stringify(payload));
};

export const getAttemptProgress = (
  userId: number,
  tutorialId: number
): AttemptProgress | null => {
  try {
    const key = buildProgressKey(userId, tutorialId);
    const raw = localStorage.getItem(key);

    if (!raw) return null;

    return JSON.parse(raw) as AttemptProgress;
  } catch {
    return null;
  }
};

export const clearAttemptProgress = (userId: number, tutorialId: number) => {
  const key = buildProgressKey(userId, tutorialId);
  localStorage.removeItem(key);
};
