import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

interface AttemptCardSkeletonProps {
  isLast?: boolean;
}

export const AttemptCardSkeleton: React.FC<AttemptCardSkeletonProps> = ({
  isLast = false,
}) => {
  return (
    <>
      <div className="flex w-full justify-between items-center px-4 py-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-30" />

          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-10 rounded-full" />
            <Skeleton className="h-6 w-10 rounded-full" />
            <Skeleton className="h-6 w-10 rounded-full" />
          </div>
        </div>

        <Skeleton className="h-8 w-24 rounded-md" />
      </div>

      {!isLast && <Separator />}
    </>
  );
};
