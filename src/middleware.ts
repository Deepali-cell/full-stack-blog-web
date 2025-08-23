// Middleware is meant to be fast; move full user creation to API route

import { clerkMiddleware, auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async () => {
  const { userId } = await auth();

  if (!userId) {
    // User is not logged in, just continue
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)", "/api/:path*"],
};
