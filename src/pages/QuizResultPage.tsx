import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BadRequest } from "@/components/commons/BadRequest";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import WinnerImage from "@/assets/images/winner.png";
import { Badge } from "@/components/ui/badge";
import { Loader, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAttemptDetail } from "@/features/attempts/hooks/useAttemptDetail";
import { StateMessage } from "@/components/commons/StateMessage";

const QuizResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { attemptId } = useParams<{ attemptId: string }>();

  const searchParams = new URLSearchParams(location.search);
  const userIdParam = searchParams.get("user_id");
  const tutorialIdParam = searchParams.get("tutorial_id");

  const userId = userIdParam ? Number(userIdParam) : NaN;
  const tutorialId = tutorialIdParam ? Number(tutorialIdParam) : NaN;

  const hasValidParams =
    attemptId !== undefined &&
    userIdParam !== null &&
    tutorialIdParam !== null &&
    Number.isFinite(userId) &&
    Number.isFinite(tutorialId);

  const { data: attemptDetail, loading, error } = useAttemptDetail(attemptId);

  if (!hasValidParams) {
    return <BadRequest />;
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader className="h-4 w-4 animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !attemptDetail) {
    const errorMessage =
      typeof error === "string"
        ? error
        : "Quiz tidak ditemukan atau sudah tidak tersedia.";

    return (
      <StateMessage
        title="Gagal mendapatkan data quiz"
        image="not-found"
        description={errorMessage}
      />
    );
  }

  const totalQuestions = attemptDetail.totalQuestions ?? 0;
  const correctAnswers = attemptDetail.correctAnswers ?? 0;
  const score =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  const handleBackToHome = () => {
    navigate(`/embed?user_id=${userId}&tutorial_id=${tutorialId}`, {
      replace: true,
    });
  };

  return (
    <div className="grid min-h-[calc(100vh-181px)] place-items-center p-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="default">
            <img
              src={WinnerImage}
              className="opacity-50 max-w-60 w-full h-auto"
              alt="Congrats"
            />
          </EmptyMedia>
          <EmptyTitle>Selamat!</EmptyTitle>
          <EmptyDescription className="space-y-1">
            <p>Kamu telah berhasil menjawab semua soal.</p>
            <p className="text-sm">
              Jawaban benar :
              <span className="font-semibold">
                {" "}
                {correctAnswers} / {totalQuestions}
              </span>
            </p>
          </EmptyDescription>
          <Badge className="gap-1">
            <Star className="h-4 w-4" /> {score} Poin
          </Badge>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" size="sm" onClick={handleBackToHome}>
            Kembali ke halaman utama
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default QuizResultPage;
