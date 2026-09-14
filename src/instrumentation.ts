/**
 * Records every server-side request error so it can be read back by digest.
 * See src/lib/server/last-error.ts for why this exists and how it is read.
 *
 * Next calls onRequestError for errors thrown in Server Components, Server
 * Actions, Route Handlers and Middleware. The `err` it passes is the original
 * Error with the same `digest` Next then prints on the error page.
 */
export async function onRequestError(
  err: unknown,
  request: { path: string; method: string },
  context: { routeType?: string; renderSource?: string },
): Promise<void> {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  const { recordError } = await import('./lib/server/last-error');
  const e = err as { digest?: unknown; message?: unknown; name?: unknown; stack?: unknown };

  recordError({
    digest: typeof e?.digest === 'string' ? e.digest : 'no-digest',
    message: typeof e?.message === 'string' ? e.message : String(err),
    name: typeof e?.name === 'string' ? e.name : 'Error',
    stack: typeof e?.stack === 'string' ? e.stack.split('\n').slice(0, 14).join('\n') : null,
    path: request.path,
    method: request.method,
    routeType: context.routeType ?? null,
    renderSource: context.renderSource ?? null,
    at: new Date().toISOString(),
  });
}
