import { NextRequest, NextResponse } from "next/server";

const matcher = /(api|_next\/static|_next\/image|svg|favicon.ico|sprite.svg)/gi;
const routes = /\/(sign-in|sign-up|intro)/gi;

export default async function withAuth(request: NextRequest) {
    if (request.nextUrl.pathname.match(matcher)) {
        return NextResponse.next();
    }

    const isAuth = request.cookies.get("auth-token")?.value ?? false;

    if (isAuth && request.nextUrl.pathname.match(routes)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!isAuth && !request.nextUrl.pathname.match(routes)) {
        return NextResponse.redirect(new URL("/intro", request.url));
    }

    return NextResponse.next();
}
