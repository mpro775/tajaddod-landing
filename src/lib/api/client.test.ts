import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiError, apiGet } from './client';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.useRealTimers();
});

describe('SSR API client', () => {
  it('unwraps API envelopes and sends the requested language', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ data: { projects: [] } }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'x-request-id': 'req-1' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);
    await expect(apiGet<{ projects: unknown[] }>('projects', 'en')).resolves.toEqual({ projects: [] });
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/api/v1/projects'),
      expect.objectContaining({ headers: expect.objectContaining({ 'Accept-Language': 'en' }) }),
    );
  });

  it('returns a typed service-unavailable error on partial API failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network')));
    await expect(apiGet('website/home', 'ar')).rejects.toMatchObject({
      name: 'ApiError',
      status: 503,
      code: 'API_UNAVAILABLE',
    });
  });

  it('preserves HTTP status, code, and request id from backend failures', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: 'Not found', code: 'NOT_FOUND' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', 'x-request-id': 'req-404' },
        }),
      ),
    );
    try {
      await apiGet('projects/missing', 'en');
      throw new Error('Expected API call to fail');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(error).toMatchObject({ status: 404, code: 'NOT_FOUND', requestId: 'req-404' });
    }
  });

  it('aborts requests that exceed the configured timeout', async () => {
    vi.stubEnv('API_REQUEST_TIMEOUT_MS', '5');
    vi.stubGlobal(
      'fetch',
      vi.fn((_url, init: RequestInit) => new Promise((_resolve, reject) => {
        init.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
      })),
    );
    await expect(apiGet('website/home', 'en')).rejects.toMatchObject({
      status: 504,
      code: 'API_TIMEOUT',
    });
  });
});
