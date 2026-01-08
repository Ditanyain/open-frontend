import axios from "axios";
import type { UserPreference, UserPreferencesResponse } from "./types";

const BACKEND_BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL ?? "http://localhost:5000";

export const preferencesApi = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || "Request failed";
  }
  return "Unknown error";
};

export const fetchUserPreferences = async (
  userId: string
): Promise<UserPreference | null> => {
  try {
    const res = await preferencesApi.get<UserPreferencesResponse>(
      `/api/users/${userId}/preferences`
    );

    return res.data.data?.preference ?? null;
  } catch (error) {
    console.error(
      "Error fetching user preferences:",
      extractErrorMessage(error)
    );
    return null;
  }
};
