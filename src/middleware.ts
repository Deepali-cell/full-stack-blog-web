// src/middleware.ts
import { clerkMiddleware, auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async () => {
  const { userId } = auth();

  if (!userId) {
    // User is not logged in, just continue
    return NextResponse.next();
  }

  // ✅ Do NOT fetch full user info in middleware
  // Middleware is meant to be fast; move full user creation to API route

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)", "/api/:path*"],
};
