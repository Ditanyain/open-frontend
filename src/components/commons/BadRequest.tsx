import React from "react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";

import BadRequestImage from "@/assets/images/400-error.png";

const BadRequest: React.FC = () => {
  return (
    <div className="grid min-h-[calc(100vh-57px)] place-items-center p-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="default">
            <img
              src={BadRequestImage}
              className="opacity-50 max-w-[320px] w-full h-auto"
              alt="Bad request"
            />
          </EmptyMedia>
          <EmptyTitle>Oops! Akses tidak sesuai</EmptyTitle>
          <EmptyDescription>
            Halaman ini hanya bisa dibuka melalui LMS.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
};

export { BadRequest };
