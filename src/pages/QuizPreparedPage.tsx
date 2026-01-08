import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BadRequest } from "@/components/commons/BadRequest";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import WritingImage from "@/assets/images/writing.png";

const QuizPreparedPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const userIdParam = searchParams.get("user_id");
  const tutorialIdParam = searchParams.get("tutorial_id");

  const userId = userIdParam ? Number(userIdParam) : NaN;
  const tutorialId = tutorialIdParam ? Number(tutorialIdParam) : NaN;

  const hasValidParams =
    userIdParam !== null &&
    tutorialIdParam !== null &&
    Number.isFinite(userId) &&
    Number.isFinite(tutorialId);

  if (!hasValidParams) {
    return <BadRequest />;
  }

  return (
    <div className="grid min-h-[calc(100vh-57px)] place-items-center p-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="default">
            <img
              src={WritingImage}
              className="opacity-50 max-w-60 w-full h-auto"
              alt="Congrats"
            />
          </EmptyMedia>
          <EmptyTitle>Soal Sedang Dipersiapkan</EmptyTitle>
          <EmptyDescription>
            Tunggu sebentar ya, sistem sedang mempersiapkan soal untuk kamu.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              navigate(
                `/embed?user_id=${userIdParam}&tutorial_id=${tutorialIdParam}`
              )
            }
          >
            Kembali ke halaman utama
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default QuizPreparedPage;
