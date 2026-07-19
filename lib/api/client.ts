import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

const UNSAFE_METHODS = new Set(["post", "put", "patch", "delete"]);

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export const api = axios.create({ baseURL: API_BASE, withCredentials: true });

let csrfToken: string | null = null;

export async function fetchCsrfToken(): Promise<string> {
  const { data } = await axios.get<{ csrfToken: string }>(
    `${API_BASE}/auth/csrf/`,
    { withCredentials: true },
  );
  csrfToken = data.csrfToken;
  return csrfToken;
}

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const method = (config.method ?? "get").toLowerCase();
  if (UNSAFE_METHODS.has(method)) {
    if (!csrfToken) {
      await fetchCsrfToken();
    }
    config.headers.set("X-CSRFToken", csrfToken as string);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    // Ne jamais tenter de rafraîchir sur l'appel /auth/refresh/ lui-même
    // (sinon un refresh qui répond 401 relancerait un refresh → récursion infinie).
    const isRefreshCall = original?.url?.includes("/auth/refresh/") ?? false;

    if (
      error.response?.status === 401 &&
      original &&
      !original._retry &&
      !isRefreshCall
    ) {
      original._retry = true;
      try {
        await api.post("/auth/refresh/");
        return api(original);
      } catch {
        throw new ApiError(401, "Session expirée. Veuillez vous reconnecter.");
      }
    }

    const status = error.response?.status ?? 0;
    throw new ApiError(status, error.message, error.response?.data);
  },
);
