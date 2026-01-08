export type ApiStatus = "success" | "fail" | "error";

export interface ApiResponse<TData = unknown, TMeta = unknown> {
  status: ApiStatus;
  message: string;
  data?: TData;
  meta?: TMeta;
}

export interface ApiError extends Error {
  status?: number;
}
