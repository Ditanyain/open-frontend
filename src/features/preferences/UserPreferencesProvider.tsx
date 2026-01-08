import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { fetchUserPreferences } from "./api";
import type { UserPreference } from "./types";
import { UserPreferencesContext } from "./UserPreferencesContext";

interface Props {
  children: ReactNode;
}

function applyTheme(preferences: UserPreference | null) {
  const root = document.documentElement;
  const body = document.body;

  if (!preferences) {
    root.classList.remove("dark");
    body.dataset.fontStyle = "default";
    body.dataset.fontSize = "medium";
    body.dataset.layoutWidth = "fullWidth";
    return;
  }

  const theme = preferences.theme ?? "light";
  if (theme === "dark") {
    root.classList.add("dark");
  } else if (theme === "light") {
    root.classList.remove("dark");
  } else if (theme === "system") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }

  body.dataset.fontStyle = preferences.fontStyle ?? "default";

  body.dataset.fontSize = preferences.fontSize ?? "medium";

  body.dataset.layoutWidth = preferences.layoutWidth ?? "fullWidth";
}

export function UserPreferencesProvider({ children }: Props) {
  const location = useLocation();
  const [preferences, setPreferences] = useState<UserPreference | null>(null);
  const [loading, setLoading] = useState(true);

  const userId = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("user_id");
  }, [location.search]);

  useEffect(() => {
    let isCancelled = false;

    const load = async () => {
      setLoading(true);

      if (!userId) {
        setPreferences(null);
        setLoading(false);
        return;
      }

      const pref = await fetchUserPreferences(userId);

      if (!isCancelled) {
        setPreferences(pref);
        setLoading(false);
      }
    };

    void load();

    return () => {
      isCancelled = true;
    };
  }, [userId]);

  useEffect(() => {
    applyTheme(preferences);
  }, [preferences]);

  return (
    <UserPreferencesContext.Provider value={{ preferences, loading, userId }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}
