import React from "react";
import { Outlet } from "react-router-dom";
import { UserPreferencesProvider } from "./features/preferences/UserPreferencesProvider";
import { Navbar } from "./components/commons/Navbar";
import { Toaster } from "./components/ui/sonner";

const EmbedLayout: React.FC = () => {
  return (
    <UserPreferencesProvider>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Toaster />
    </UserPreferencesProvider>
  );
};

export default EmbedLayout;
