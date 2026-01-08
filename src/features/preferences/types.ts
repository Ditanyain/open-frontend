export type LayoutWidth = "fullWidth" | "boxed";
export type FontStyle = "default" | "serif" | "open-dyslexic";
export type ThemeMode = "light" | "dark" | "system";
export type FontSize = "small" | "medium" | "large";

export interface UserPreference {
  layoutWidth: LayoutWidth;
  fontStyle: FontStyle;
  theme: ThemeMode;
  fontSize: FontSize;
}

export interface UserPreferencesResponse {
  status: string;
  message: string;
  data: {
    preference: UserPreference;
  };
}
