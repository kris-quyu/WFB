const base = import.meta.env.BASE_URL;

/** Prefix a local public path with Astro's configured deployment base. */
export function withBase(path: string): string {
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;

  if (path === normalizedBase || path.startsWith(normalizedBase)) return path;

  return `${normalizedBase}${path.replace(/^\/+/, '')}`;
}

/** Convert a browser pathname back to the route path used by this site. */
export function withoutBase(pathname: string): string {
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;

  if (!pathname.startsWith(normalizedBase)) return pathname;

  const route = pathname.slice(normalizedBase.length);
  return route ? `/${route}` : '/';
}
