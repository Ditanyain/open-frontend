import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { BadRequest } from "@/components/commons/BadRequest";
import { StateMessage } from "@/components/commons/StateMessage";
import { QuizOption } from "@/components/quiz/QuizOption";
import { QuizQuestionSkeleton } from "@/components/quiz/QuizQuestionSkeleton";
import { QuizFooter } from "@/components/quiz/QuizFooter";

import { Badge } from "@/components/ui/badge";

import { useAttemptDetail } from "@/features/attempts/hooks/useAttemptDetail";
import { useSubmitAnswer } from "@/features/attempts/hooks/useSubmitAnswer";
import { useSubmitAttempt } from "@/features/attempts/hooks/useSubmitAttempt";
import type { AttemptQuestionDetail } from "@/features/attempts/types";
import {
  clearAttemptProgress,
  saveAttemptProgress,
} from "@/features/attempts/storage";

const QuizPage: React.FC = () => {
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const [evaluatedQuestions, setEvaluatedQuestions] = useState<
    Record<string, AttemptQuestionDetail | undefined>
  >({});

  const quiz = attemptDetail;

  const totalQuestions = quiz?.questions.length ?? 0;

  const baseQuestion: AttemptQuestionDetail | undefined =
    quiz?.questions[currentIndex];

  const currentQuestion: AttemptQuestionDetail | undefined =
    baseQuestion &&
    (evaluatedQuestions[baseQuestion.questionId] ?? baseQuestion);

  const { loading: submitting, run: submitAnswer } = useSubmitAnswer({
    attemptId: attemptId ?? "",
  });

  useEffect(() => {
    if (!hasValidParams) return;
    if (!attemptId) return;

    saveAttemptProgress(userId, tutorialId, attemptId);
  }, [hasValidParams, attemptId, userId, tutorialId]);

  const {
    loading: finishing,
    error: finishError,
    run: finishAttempt,
  } = useSubmitAttempt(attemptId!);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    if (!quiz) return;
    setCurrentIndex((prev) =>
      prev < quiz.questions.length - 1 ? prev + 1 : prev
    );
  };

  const handleToggleOption = (
    questionId: string,
    optionId: string,
    nextSelected: boolean
  ) => {
    const questionType = quiz?.questions.find(
      (q) => q.questionId === questionId
    )?.type;

    setAnswers((prev) => {
      const prevForQuestion = prev[questionId] ?? [];

      if (!nextSelected) {
        const nextForQuestion = prevForQuestion.filter((id) => id !== optionId);
        return {
          ...prev,
          [questionId]: nextForQuestion,
        };
      }

      if (questionType && questionType !== "MULTIPLE") {
        return {
          ...prev,
          [questionId]: [optionId],
        };
      }

      const nextForQuestion = Array.from(
        new Set([...prevForQuestion, optionId])
      );

      return {
        ...prev,
        [questionId]: nextForQuestion,
      };
    });
  };

  const handleSubmitCurrent = async () => {
    if (!quiz || !currentQuestion) return;

    const selectedOptionIds = answers[currentQuestion.questionId] ?? [];

    try {
      const res = await submitAnswer({
        questionId: currentQuestion.questionId,
        optionIds: selectedOptionIds,
      });

      if (res) {
        setEvaluatedQuestions((prev) => ({
          ...prev,
          [res.question.questionId]: res.question,
        }));
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Gagal mengirim jawaban. Coba lagi ya.";
      toast.error(message);
    }
  };

  if (!hasValidParams) {
    return <BadRequest />;
  }

  if (loading || !quiz || !currentQuestion) {
    if (loading) {
      return <QuizQuestionSkeleton />;
    }

    if (error) {
      return (
        <StateMessage
          title="Gagal memuat quiz"
          image="error"
          description={
            typeof error === "string"
              ? error
              : "Terjadi kesalahan saat memuat soal."
          }
        />
      );
    }

    if (!quiz || !currentQuestion) {
      return (
        <StateMessage
          title="Quiz tidak tersedia"
          image="not-found"
          description="Quiz ini tidak ditemukan atau sudah tidak bisa diakses."
        />
      );
    }
  }

  const isCurrentEvaluated =
    currentQuestion.isAnswered === true ||
    currentQuestion.options.some((o) => typeof o.isCorrect === "boolean");

  const currentSelectedIds = answers[currentQuestion.questionId] ?? [];
  const hasSelectedAnswer =
    (answers[currentQuestion.questionId] ?? []).length > 0;

  return (
    <div className="min-h-[calc(100vh-57px)] flex flex-col p-6">
      <div className="space-y-6 flex-1">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">
            Pertanyaan {currentIndex + 1} dari {totalQuestions}
          </p>
          <div className="text-lg">
            <span 
              className="mr-2 inline"
              dangerouslySetInnerHTML={{ __html: currentQuestion.question }} 
            />
            
            {currentQuestion.type === "MULTIPLE" && (
              <Badge variant="outline" className="align-middle">
                Pilih 2-3 opsi
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {currentQuestion.options.map((opt) => (
            <QuizOption
              key={opt.optionId}
              optionId={opt.optionId}
              option={opt.option}
              isSelected={
                isCurrentEvaluated
                  ? opt.isSelected ?? false
                  : currentSelectedIds.includes(opt.optionId)
              }
              isCorrect={opt.isCorrect}
              reason={opt.reason}
              onChangeSelect={
                isCurrentEvaluated
                  ? undefined
                  : (optionId, nextSelected) =>
                      handleToggleOption(
                        currentQuestion.questionId,
                        optionId,
                        nextSelected
                      )
              }
            />
          ))}
        </div>
      </div>

      <QuizFooter
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        isCurrentEvaluated={isCurrentEvaluated}
        hasSelectedAnswer={hasSelectedAnswer}
        submitting={submitting}
        finishing={finishing}
        onPrev={handlePrev}
        onNext={handleNext}
        onSubmitCurrent={handleSubmitCurrent}
        onFinish={async () => {
          try {
            await finishAttempt();

            clearAttemptProgress(userId, tutorialId);

            navigate(
              `result?user_id=${userIdParam}&tutorial_id=${tutorialIdParam}`
            );
          } catch {
            toast.error(finishError ?? "Gagal submit attempt.");
          }
        }}
      />
    </div>
  );
};

export default QuizPage;
