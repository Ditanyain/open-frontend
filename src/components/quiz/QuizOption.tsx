import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface QuizOptionProps {
  optionId: string;
  option: string;
  reason?: string;
  isCorrect?: boolean;
  isSelected?: boolean;
  onChangeSelect?: (optionId: string, nextSelected: boolean) => void;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  optionId,
  option,
  reason,
  isCorrect,
  isSelected = false,
  onChangeSelect,
}) => {
  const hasEvaluation = typeof isCorrect === "boolean";

  const handleCheckedChange = (checked: boolean | "indeterminate") => {
    if (!onChangeSelect) return;
    onChangeSelect(optionId, checked === true);
  };

  let containerClasses = "flex items-start gap-3 rounded-lg border p-3";

  if (!hasEvaluation) {
    containerClasses +=
      " has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 " +
      "dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950";
  }

  if (hasEvaluation) {
    if (isCorrect) {
      containerClasses +=
        " border-green-600 bg-green-50 dark:border-green-800 dark:bg-green-950";
    }

    if (!isCorrect && isSelected) {
      containerClasses +=
        " border-destructive/70 bg-destructive/10 dark:border-destructive dark:bg-destructive/10";
    }
  }

  let checkboxClasses =
    "mt-0.5 data-[state=checked]:text-white transition-colors";

  if (!hasEvaluation) {
    checkboxClasses +=
      " data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600";
  } else {
    if (isSelected && isCorrect) {
      checkboxClasses +=
        " data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600" +
        " dark:data-[state=checked]:border-green-600 dark:data-[state=checked]:bg-green-600";
    }
    if (isSelected && !isCorrect) {
      checkboxClasses +=
        " data-[state=checked]:border-destructive data-[state=checked]:bg-destructive" +
        " dark:data-[state=checked]:border-destructive dark:data-[state=checked]:bg-destructive";
    }
  }

  return (
    <Label className={containerClasses}>
      <Checkbox
        id={optionId}
        checked={isSelected}
        onCheckedChange={handleCheckedChange}
        className={checkboxClasses}
      />
      <div className="grid gap-1.5 font-normal">
        <div className="text-sm" dangerouslySetInnerHTML={{ __html: option }} />
        {isSelected && reason && (
          <span
            className="text-xs text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: reason }}
          />
        )}
      </div>
    </Label>
  );
};

export { QuizOption };
