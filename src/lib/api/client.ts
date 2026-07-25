import type { Locale, QueryParams } from './types';

const DEFAULT_API_BASE_URL = 'http://localhost:3000/api/v1';
const DEFAULT_TIMEOUT_MS = 8000;
const DEFAULT_LOCALE: Locale = import.meta.env.DEFAULT_LOCALE === 'en' ? 'en' : 'ar';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
    public readonly requestId?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function apiBaseUrl(): string {
  return (import.meta.env.API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, '');
}

function timeoutMs(): number {
  const parsed = Number(
    import.meta.env.API_REQUEST_TIMEOUT_MS ||
      import.meta.env.API_TIMEOUT_MS ||
      DEFAULT_TIMEOUT_MS,
  );
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_TIMEOUT_MS;
}

function buildUrl(path: string, query?: QueryParams): string {
  const url = new URL(`${apiBaseUrl()}/${path.replace(/^\/+/, '')}`);
  Object.entries(query || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value) !== '') {
      url.searchParams.set(key, String(value));
    }
  });
  return url.toString();
}

function unwrap<T>(payload: unknown): T {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

export async function apiGet<T>(
  path: string,
  locale: Locale = DEFAULT_LOCALE,
  query?: QueryParams,
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs());

  try {
    const response = await fetch(buildUrl(path, query), {
      headers: {
        Accept: 'application/json',
        'Accept-Language': locale,
      },
      signal: controller.signal,
      cache: 'no-store',
    });
    const requestId =
      response.headers.get('x-request-id') || response.headers.get('x-correlation-id') || undefined;
    const payload = await response.json().catch(() => undefined);

    if (!response.ok) {
      const source = payload && typeof payload === 'object' ? (payload as Record<string, unknown>) : {};
      const message =
        (typeof source.message === 'string' && source.message) ||
        (locale === 'ar' ? 'تعذر تحميل البيانات من الخادم.' : 'Unable to load data from the server.');
      throw new ApiError(message, response.status, String(source.code || ''), requestId);
    }

    return unwrap<T>(payload);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(
        locale === 'ar' ? 'انتهت مهلة الاتصال بالخادم.' : 'The server request timed out.',
        504,
        'API_TIMEOUT',
      );
    }
    throw new ApiError(
      locale === 'ar' ? 'تعذر الاتصال بالخادم.' : 'Could not connect to the server.',
      503,
      'API_UNAVAILABLE',
    );
  } finally {
    clearTimeout(timer);
  }
}
