import React from "react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";

import DefaultErrorImage from "@/assets/images/error.png";
import DefaultNotFoundImage from "@/assets/images/not-found.png";

type ImageVariant = "error" | "not-found";

type StateMessageProps = {
  title?: string;
  description: string;

  image?: ImageVariant;
  imageSrc?: string;
  imageAlt?: string;

  maxImageWidth?: number;
  asChild?: boolean;
};

const imageMap: Record<ImageVariant, string> = {
  error: DefaultErrorImage,
  "not-found": DefaultNotFoundImage,
};

const StateMessage: React.FC<StateMessageProps> = ({
  title,
  description,

  image = "error",
  imageSrc,
  imageAlt = "State illustration",

  maxImageWidth = 320,
  asChild = false,
}) => {
  const resolvedImage = imageSrc ?? imageMap[image];

  const content = (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <img
            src={resolvedImage}
            alt={imageAlt}
            className="opacity-50 w-full h-auto"
            style={{ maxWidth: maxImageWidth }}
          />
        </EmptyMedia>

        {title && <EmptyTitle>{title}</EmptyTitle>}

        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );

  if (asChild) {
    return content;
  }

  return (
    <div className="min-h-[calc(100vh-57px)] flex items-center justify-center">
      {content}
    </div>
  );
};

export { StateMessage };
