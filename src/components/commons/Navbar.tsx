import React from "react";
import DitanyainLogo from "@/assets/logo.svg";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const userIdParam = searchParams.get("user_id");
  const tutorialIdParam = searchParams.get("tutorial_id");

  const userId = userIdParam ? Number(userIdParam) : NaN;
  const tutorialId = tutorialIdParam ? Number(tutorialIdParam) : NaN;

  return (
    <header className="sticky top-0 z-50 border-b bg-muted p-8 py-4">
      <Link
        to={`/embed?user_id=${userId}&tutorial_id=${tutorialId}`}
        className=" flex items-center gap-2 "
      >
        <img
          src={DitanyainLogo}
          className="size-6 dark:invert"
          alt="Ditanyain"
        />
        <span className="font-semibold">Ditanyain</span>
      </Link>
    </header>
  );
};

export { Navbar };
