import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";

import { BadRequest } from "@/components/commons/BadRequest";
import { StateMessage } from "@/components/commons/StateMessage";
import { AttemptCard } from "@/components/homepage/AttemptCard";
import { AttemptCardSkeleton } from "@/components/homepage/AttemptCardSkeleton";
import { HeroSection } from "@/components/homepage/HeroSection";
import { ResumeAttemptDialog } from "@/components/homepage/ResumeAttemptDialog";

import { Card, CardContent } from "@/components/ui/card";

import { useAttempts } from "@/features/attempts/hooks/useAttempts";
import { useCreateAttempt } from "@/features/attempts/hooks/useCreateAttempt";
import { getAttemptProgress } from "@/features/attempts/storage";

import type { ApiError } from "@/lib/api/types";
import type { AttemptItem } from "@/features/attempts/types";

const HomePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const userIdParam = searchParams.get("user_id");
  const tutorialIdParam = searchParams.get("tutorial_id");
  const fromParam = searchParams.get("from");

  const userId = userIdParam ? Number(userIdParam) : NaN;
  const tutorialId = tutorialIdParam ? Number(tutorialIdParam) : NaN;

  const {
    data: attempts,
    loading,
    error,
  } = useAttempts({
    userId,
    tutorialId,
  });
  const {
    data: quizAttempt,
    loading: creating,
    run: createAttempt,
  } = useCreateAttempt();

  const hasValidParams =
    userIdParam !== null &&
    tutorialIdParam !== null &&
    Number.isFinite(userId) &&
    Number.isFinite(tutorialId);

  const handleCreateAttempt = () => {
    createAttempt({ userId, tutorialId }).catch((err) => {
      const apiError = err as ApiError;
      const message =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat memulai quiz.";

      if (
        apiError.status === 404 &&
        message.includes("No questions available for this tutorial")
      ) {
        navigate(`quiz/prepared?user_id=${userId}&tutorial_id=${tutorialId}`);
        return;
      }

      toast.error(message);
    });
  };

  const handleAttemptCardAction = (
    attemptId: string,
    isAttemptDone: boolean
  ) => {
    if (isAttemptDone) {
      navigate(
        `quiz/${attemptId}/review?user_id=${userIdParam}&tutorial_id=${tutorialIdParam}`
      );
    } else {
      navigate(
        `quiz/${attemptId}?user_id=${userIdParam}&tutorial_id=${tutorialIdParam}`
      );
    }
  };

  useEffect(() => {
    if (quizAttempt) {
      navigate(
        `quiz/${quizAttempt.attemptId}?user_id=${userId}&tutorial_id=${tutorialId}`
      );
    }
  }, [quizAttempt, navigate, userId, tutorialId]);

  const [showResumeDialog, setShowResumeDialog] = useState(() => {
    if (!hasValidParams || fromParam === "quiz-page") return false;

    const progress = getAttemptProgress(userId, tutorialId);
    return Boolean(progress?.attemptId);
  });

  const handleResume = () => {
    const progress = getAttemptProgress(userId, tutorialId);
    if (!progress) return;

    setShowResumeDialog(false);

    navigate(
      `quiz/${progress.attemptId}?user_id=${userIdParam}&tutorial_id=${tutorialIdParam}`
    );
  };

  if (!hasValidParams) {
    return <BadRequest />;
  }

  return (
    <div className="p-8 space-y-4">
      <ResumeAttemptDialog
        open={showResumeDialog}
        onOpenChange={setShowResumeDialog}
        onResume={handleResume}
      />

      <HeroSection isLoading={creating} onStartQuiz={handleCreateAttempt} />

      <section>
        <div className="flex items-center justify-between mb-2">
          <p className="text-lg font-semibold">Riwayat</p>
        </div>

        <Card className="py-0 overflow-hidden shadow-none">
          <CardContent className="relative p-0">
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <AttemptCardSkeleton key={i} isLast={i === 5} />
              ))}

            {error && (
              <StateMessage
                title="Gagal mendapatkan riwayat"
                description={error}
                maxImageWidth={180}
                asChild
              />
            )}
            {!loading && !error && (!attempts || attempts.length === 0) && (
              <StateMessage
                title="Belum ada riwayat"
                description="Kamu belum pernah mengerjakan quiz di sini. Yuk mulai quiz pertamamu!"
                image="not-found"
                maxImageWidth={180}
                asChild
              />
            )}

            {!loading &&
              !error &&
              attempts &&
              attempts.length > 0 &&
              attempts.map((attempt: AttemptItem, index: number) => (
                <AttemptCard
                  key={attempt.attemptId}
                  attempt={attempt}
                  isLast={index === attempts.length - 1}
                  onActionClick={handleAttemptCardAction}
                />
              ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default HomePage;
