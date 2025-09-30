// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;
    const { pathname } = request.nextUrl;

    console.log("middle");

    if (!token && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (token && (pathname.startsWith("/auth") || pathname.startsWith("/home"))) {
        return NextResponse.redirect(new URL("/dashboard/forecast", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/auth/login',
        '/auth/signup',
        '/home'
    ],
}
