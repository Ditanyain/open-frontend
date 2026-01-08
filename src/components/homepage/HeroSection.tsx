import React from "react";
import { Button } from "../ui/button";
import { Loader, Play, Rocket } from "lucide-react";

interface HeroSectionProps {
  isLoading: boolean;
  onStartQuiz: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  isLoading,
  onStartQuiz,
}) => {
  return (
    <div className="border-2 border-dashed border-primary/20 rounded-xl p-8 text-center hover:border-primary/40 transition-colors">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Rocket className="h-8 w-8 text-primary" />
      </div>

      <h1 className="text-2xl font-bold mb-2">Yuk, Tes Dulu!</h1>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Buat lihat sejauh mana kamu paham materinya.
      </p>

      <Button size="lg" onClick={onStartQuiz} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Mempersiapkan Quiz...
          </>
        ) : (
          <>
            <Play className="mr-2 h-4 w-4" />
            Mulai Quiz
          </>
        )}
      </Button>
    </div>
  );
};

export { HeroSection };
