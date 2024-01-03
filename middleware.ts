import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const routes = /\/(sign-in|sign-up|intro)/gi;

export function middleware(request: NextRequest) {
    const isAuth = request.cookies.get("auth-token")?.value || false;

    if (isAuth && request.nextUrl.pathname.match(routes)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!isAuth && !request.nextUrl.pathname.match(routes)) {
        return NextResponse.redirect(new URL("/intro", request.url));
    }
}

export const config = {
    matcher: "/((?!api|_next/static|_next/image|svg|favicon.ico).*)",
};
