import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const token = (await cookies()).get("token");
  if (token) {
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register" ||
      request.nextUrl.pathname === "/recovery-password"
    ) {
      const homeURL = new URL("/", request.url);
      return NextResponse.redirect(homeURL);
    }
  } else {
    if (
      request.nextUrl.pathname !== "/login" &&
      request.nextUrl.pathname !== "/register" &&
      request.nextUrl.pathname !== "/recovery-password" &&
      request.nextUrl.pathname !== "/"
    ) {
      const loginURL = new URL("/login", request.url);
      return NextResponse.redirect(loginURL);
    }
  }
}

export const config = {
  matcher: ["/((?!_next|api/users).*)(.+)", "/login", "/register", "/"],
};
