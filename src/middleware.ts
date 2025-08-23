// src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  // Match all routes except static files & public assets
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)", "/api/:path*"],
};
