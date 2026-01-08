import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
import { ExitQuizDialog } from "@/components/quiz/ExitQuizDialog";

type Props = {
  currentIndex: number;
  totalQuestions: number;

  isCurrentEvaluated: boolean;
  hasSelectedAnswer: boolean;

  submitting: boolean;
  finishing: boolean;

  onPrev: () => void;
  onNext: () => void;
  onSubmitCurrent: () => void;
  onFinish: () => void;
};

const QuizFooter: React.FC<Props> = ({
  currentIndex,
  totalQuestions,
  isCurrentEvaluated,
  hasSelectedAnswer,
  submitting,
  finishing,
  onPrev,
  onNext,
  onSubmitCurrent,
  onFinish,
}) => {
  const isFirst = currentIndex === 0;
  const isLast = totalQuestions > 0 && currentIndex === totalQuestions - 1;

  return (
    <div className="mt-auto pt-6 flex justify-between">
      <div>
        <ExitQuizDialog />
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onPrev} disabled={isFirst}>
          <ChevronLeft /> Sebelumnya
        </Button>

        {!isCurrentEvaluated ? (
          <Button
            variant="outline"
            onClick={onSubmitCurrent}
            disabled={submitting || !hasSelectedAnswer}
          >
            {submitting && <LoaderCircle className="animate-spin" />}
            Kirim Jawaban
          </Button>
        ) : (
          <>
            {!isLast ? (
              <Button variant="outline" size="sm" onClick={onNext}>
                Selanjutnya <ChevronRight />
              </Button>
            ) : (
              <Button variant="outline" disabled={finishing} onClick={onFinish}>
                {finishing && <LoaderCircle className="animate-spin" />}
                Selesaikan
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export { QuizFooter };
