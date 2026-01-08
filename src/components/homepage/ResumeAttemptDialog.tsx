import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onResume: () => void;
};

const ResumeAttemptDialog: React.FC<Props> = ({
  open,
  onOpenChange,
  onResume,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Lanjutkan progress sebelumnya?</AlertDialogTitle>
          <AlertDialogDescription>
            Kami menemukan progress belajarmu yang belum selesai. Mau lanjutkan
            dari sana?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Tidak</AlertDialogCancel>

          <Button onClick={onResume}>Lanjutkan</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { ResumeAttemptDialog };
