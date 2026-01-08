import axios from "axios";

export function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const msg = error.response?.data?.message;

    if (msg) return msg;

    if (error.code === "ERR_NETWORK") {
      return "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
    }

    return "Terjadi kesalahan saat memproses permintaan.";
  }

  if (error instanceof Error) {
    return error.message || "Terjadi kesalahan yang tidak diketahui.";
  }

  return "Terjadi kesalahan tak terduga.";
}
