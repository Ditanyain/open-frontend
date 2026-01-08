import { createContext, useContext } from "react";
import type { UserPreference } from "./types";

interface UserPreferencesContextValue {
  preferences: UserPreference | null;
  loading: boolean;
  userId: string | null;
}

export const UserPreferencesContext = createContext<
  UserPreferencesContextValue | undefined
>(undefined);

export const useUserPreferences = () => {
  const ctx = useContext(UserPreferencesContext);

  if (!ctx) {
    throw new Error(
      "useUserPreferences must be used within UserPreferencesProvider"
    );
  }

  return ctx;
};
