// apiFetchServer.js (apenas para uso em Server Components)
import { cookies } from 'next/headers';

export async function apiFetchServer(path, options = {}) {
    const requiresAuth = options.auth !== false;

    const headers = {
        ...options.headers,
        'Content-Type': 'application/json',
    };

    if (requiresAuth) {
        const cookieStore = cookies();
        const token = cookieStore.get('token')?.value;
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
        ...options,
        headers,
        cache: 'no-store',
    });
}
