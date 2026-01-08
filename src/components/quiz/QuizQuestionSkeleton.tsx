import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const QuizQuestionSkeleton: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-57px)] flex flex-col p-6">
      <div className="space-y-6 flex-1">
        <div className="space-y-2">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-5 w-full max-w-[680px]" />
          <Skeleton className="h-5 w-3/4 max-w-[520px]" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border p-3"
            >
              <Skeleton className="h-4 w-4 rounded-sm mt-0.5 shrink-0" />

              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6 flex justify-between">
        <Skeleton className="h-9 w-32 rounded-md" />

        <div className="flex gap-2">
          <Skeleton className="h-9 w-32 rounded-md" />
          <Skeleton className="h-9 w-36 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export { QuizQuestionSkeleton };
