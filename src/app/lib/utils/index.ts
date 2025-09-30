export const getURL = () => {
    // 1. Intenta usar la URL configurada manualmente
    let url =
        process.env.NEXT_PUBLIC_SITE_URL ??
        // 2. Si está en Vercel, usa esa URL
        (process.env.NEXT_PUBLIC_VERCEL_URL
            ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
            : null) ??
        // 3. Fallback a localhost (solo en desarrollo)
        'http://localhost:3000';

    // Asegurar que siempre termine con /
    url = url.endsWith('/') ? url : `${url}/`;

    return url;
};
