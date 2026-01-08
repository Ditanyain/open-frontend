import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Loader } from "lucide-react";
import { QuizOption } from "@/components/quiz/QuizOption";
import { useAttemptDetail } from "@/features/attempts/hooks/useAttemptDetail";
import { Button } from "@/components/ui/button";
import { StateMessage } from "@/components/commons/StateMessage";

const AttemptResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const userIdParam = searchParams.get("user_id");
  const tutorialIdParam = searchParams.get("tutorial_id");

  const userId = userIdParam ? Number(userIdParam) : NaN;
  const tutorialId = tutorialIdParam ? Number(tutorialIdParam) : NaN;

  const { attemptId } = useParams<{ attemptId: string }>();
  const { data: attemptDetail, loading, error } = useAttemptDetail(attemptId);

  const handleBack = () => {
    navigate(`/embed?user_id=${userId}&tutorial_id=${tutorialId}`);
  };

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

  const { questions } = attemptDetail;

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col p-6">
      <div className="space-y-8 flex-1 overflow-y-auto">
        {questions.map((question) => (
          <div key={question.questionId} className="space-y-4">
            <div className="space-y-1">
              <div 
                className="text-lg font-medium leading-snug"
                dangerouslySetInnerHTML={{ __html: question.question }}
              />
            </div>

            <div className="space-y-4">
              {question.options.map((opt) => (
                <QuizOption
                  key={opt.optionId}
                  optionId={opt.optionId}
                  option={opt.option}
                  isSelected={opt.isSelected}
                  isCorrect={opt.isCorrect}
                  reason={opt.reason}
                />
              ))}
            </div>

            <Separator className="my-8" />
          </div>
        ))}
        <Button variant="outline" onClick={handleBack}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Kembali
        </Button>
      </div>
    </div>
  );
};

export default AttemptResultPage;