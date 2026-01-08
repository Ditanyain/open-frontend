import axios from "axios";
import { extractErrorMessage } from "@/lib/api/utils";
import type {
  AttemptsFilter,
  AttemptsListResponse,
  AttemptItem,
  CreateAttemptParams,
  CreateAttemptResponse,
  CreateAttemptData,
  AttemptDetail,
  AttemptDetailResponse,
  SubmitAnswerPayload,
  SubmitAnswerData,
  SubmitAnswerResponse,
} from "./types";
import type { ApiError } from "@/lib/api/types";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export async function getAttempts(
  filters: AttemptsFilter
): Promise<AttemptItem[]> {
  try {
    const res = await axios.get<AttemptsListResponse>(
      `${BASE_URL}/api/attempts`,
      {
        params: {
          user_id: filters.userId,
          tutorial_id: filters.tutorialId,
        },
      }
    );

    if (!res.data.data) {
      return [];
    }

    return res.data.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function createAttempt(
  params: CreateAttemptParams
): Promise<CreateAttemptData> {
  try {
    const res = await axios.get<CreateAttemptResponse>(
      `${BASE_URL}/api/quizzes`,
      {
        params: {
          user_id: params.userId,
          tutorial_id: params.tutorialId,
        },
      }
    );

    if (!res.data.data) {
      const err: ApiError = new Error("Data quiz tidak ditemukan.");
      err.status = res.status;
      throw err;
    }

    return res.data.data;
  } catch (error) {
    const message = extractErrorMessage(error);

    if (axios.isAxiosError(error)) {
      const err: ApiError = new Error(message);
      err.status = error.response?.status;
      throw err;
    }

    const err: ApiError = new Error(message);
    throw err;
  }
}

export async function getAttemptDetail(
  attemptId: string
): Promise<AttemptDetail> {
  try {
    const res = await axios.get<AttemptDetailResponse>(
      `${BASE_URL}/api/attempts/${attemptId}`
    );

    if (!res.data.data) {
      throw new Error("Attempt tidak ditemukan.");
    }

    return res.data.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function submitAttemptAnswer(
  attemptId: string,
  payload: SubmitAnswerPayload
): Promise<SubmitAnswerData> {
  try {
    const res = await axios.post<SubmitAnswerResponse>(
      `${BASE_URL}/api/attempts/${attemptId}/answers`,
      payload
    );

    if (!res.data.data) {
      throw new Error("Jawaban tidak dapat diproses.");
    }

    return res.data.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function submitAttempt(attemptId: string): Promise<void> {
  try {
    await axios.post(`${BASE_URL}/api/attempts/${attemptId}/submit`, {});
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}
