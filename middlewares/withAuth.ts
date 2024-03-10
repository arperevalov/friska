import { NextRequest, NextResponse } from "next/server";

const matcher = /(api|_next\/static|_next\/image|favicons|img|js)/gi;
const routes = /\/(sign-in|sign-up|intro)/gi;

export default async function withAuth(request: NextRequest) {
    const { pathname } = request.nextUrl;
    if (pathname.match(matcher)) {
        return NextResponse.next();
    }

    const isAuth = request.cookies.get("auth-token")?.value ?? false;
    const isConfirmedValue = request.cookies.get("confirmed")?.value;
    const isConfirmed = isConfirmedValue ? JSON.parse(isConfirmedValue) : false;

    if (isAuth && !isConfirmed && !pathname.match(/\/confirm/)) {
        return NextResponse.redirect(new URL("/confirm", request.url));
    }

    if (isAuth && isConfirmed && pathname.match(/\/confirm/)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (isAuth && pathname.match(routes)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!isAuth && !pathname.match(routes)) {
        return NextResponse.redirect(new URL("/intro", request.url));
    }

    return NextResponse.next();
}
