import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { AttemptItem } from "@/features/attempts/types";
import { formatTimestamp } from "@/lib/utils";

interface AttemptCardProps {
  attempt: AttemptItem;
  isLast?: boolean;
  onActionClick: (attemptId: string, isAttemptDone: boolean) => void;
}

export const AttemptCard: React.FC<AttemptCardProps> = ({
  attempt,
  isLast = false,
  onActionClick,
}) => {
  const isDone = Boolean(attempt.submittedAt);
  const progressPercentage = Math.round(
    (attempt.answeredQuestions / attempt.totalQuestions) * 100
  );
  return (
    <>
      <div className="p-4 hover:border-primary transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <svg className="transform -rotate-90 w-16 h-16">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#e5e7eb"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke={isDone ? "#22c55e" : "#3b82f6"}
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${
                    (attempt.answeredQuestions / attempt.totalQuestions) * 175.9
                  } 175.9`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold">{progressPercentage}%</span>
              </div>
            </div>

            <div>
              <p className="font-medium">
                {formatTimestamp(attempt.createdAt)}
              </p>
              <p className="text-sm text-muted-foreground">
                {attempt.correctAnswers} dari {attempt.totalQuestions} benar
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onActionClick(attempt.attemptId, isDone)}
          >
            {isDone ? "Lihat hasil" : "Lanjutkan"}
          </Button>
        </div>
      </div>

      {!isLast && <Separator />}
    </>
  );
};
