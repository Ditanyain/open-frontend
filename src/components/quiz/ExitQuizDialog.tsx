import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const ExitQuizDialog: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const userIdParam = searchParams.get("user_id");
  const tutorialIdParam = searchParams.get("tutorial_id");

  const userId = userIdParam ? Number(userIdParam) : NaN;
  const tutorialId = tutorialIdParam ? Number(tutorialIdParam) : NaN;

  const handleExitQuiz = () => {
    navigate(
      `/embed?user_id=${userId}&tutorial_id=${tutorialId}&from=quiz-page`
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <LogOut className="h-4 w-4" /> Keluar Kuis
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Apakah kamu yakin keluar dari quiz?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Progres jawabanmu tetap tersimpan dan bisa dilanjutkan kembali
            nanti.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <Button variant="destructive" onClick={handleExitQuiz}>
            Keluar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { ExitQuizDialog };
