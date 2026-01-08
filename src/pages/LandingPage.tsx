import React from "react";
import { Sparkles, Gauge, Bot, Plug } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

import DitanyainScreenshotImage from "@/assets/images/ditanyain-screenshot.png";
import DitanyainLogo from "@/assets/images/ditanyain-icon.png";

const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute -top-28 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-28 right-10 h-80 w-80 rounded-full bg-muted/40 blur-3xl" />
      </div>

      <main className="mx-auto grid min-h-screen max-w-6xl items-center p-12">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2">
          <Empty className="w-full">
            <EmptyHeader className="space-y-4 lg:space-y-5">
              <EmptyTitle>
                <div className="flex items-center justify-center gap-3 leading-none">
                  <img
                    src={DitanyainLogo}
                    alt="Ditanyain logo"
                    className="h-8 w-8 shrink-0"
                  />
                  <span className="text-3xl font-semibold sm:text-4xl leading-none">
                    Ditanyain
                  </span>
                </div>
              </EmptyTitle>

              <EmptyDescription className="max-w-xl text-base leading-relaxed">
                AI Based Formative Assessment, dengan feedback adaptif untuk
                membantu kamu mengetahui seberapa paham terhadap materi.
              </EmptyDescription>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                  <Bot className="h-3.5 w-3.5" />
                  AI-based formative assessment
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                  <Gauge className="h-3.5 w-3.5" />
                  Fast &amp; lightweight
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                  Feedback informatif per soal
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                  <Plug className="h-3.5 w-3.5" />
                  Seamless integration
                </span>
              </div>
            </EmptyHeader>
          </Empty>

          <div className="w-full">
            <div className="rounded-2xl border bg-card/40 p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2 px-1">
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
              </div>

              <div className="p-4">
                <img
                  src={DitanyainScreenshotImage}
                  alt="Ditanyain preview"
                  className="w-full rounded-xl border shadow-sm"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="mt-10 text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} Ditanyain • Built for learning, not
              judging.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
