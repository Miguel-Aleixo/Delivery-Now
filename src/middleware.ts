import { NextResponse, type MiddlewareConfig, type NextRequest } from "next/server";
import { jwtDecode } from 'jwt-decode';

type TokenPayload = {
    name: string;
    email: string;
    role: string;
    exp: number;
    iat: number;
};

const publicRoutes = [
    { path: '/login', whenAutenticated: 'redirect' },
    { path: '/cadastro', whenAutenticated: 'redirect' },
    { path: '/', whenAutenticated: 'next' },
    { path: '/SelecionarSabor/1', whenAutenticated: 'next' },
    { path: '/SelecionarSabor/2', whenAutenticated: 'next' },
] as const

const privateRouteAcessUser = [
    { path: '/carrinho' },
    { path: '/User' }
] as const

const REDIRECT_NO_AUTHENTICATED = '/login';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const publicRoute = publicRoutes.find(route => route.path === path)
    const privateRoute = privateRouteAcessUser.find(route => route.path === path)
    const authToken = request.cookies.get('token')

    if (authToken) {
        const decoded = jwtDecode<TokenPayload>(authToken.value);

        if (authToken && publicRoute && publicRoute.whenAutenticated === 'redirect') {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = '/'

            return NextResponse.redirect(redirectUrl)
        }

        if (authToken && decoded.role === 'USUARIO' && privateRoute) {
            return NextResponse.next()
        }

        if (authToken && decoded.role !== 'ADMINISTRADOR' && !publicRoute && !privateRoute) {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = '/'

            return NextResponse.redirect(redirectUrl)
        }
    }

    if (!authToken && publicRoute) {
        return NextResponse.next();
    }

    if (!authToken && !publicRoute) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_NO_AUTHENTICATED

        return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}