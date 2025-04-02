import { clerkMiddleware, auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export default clerkMiddleware(async () => {
  const userId = auth().userId; // Correct way to get userId

  if (!userId) return NextResponse.next(); // If user is not logged in, continue request

  try {
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      const clerkUser = await auth().user(); // Fetch user details
      if (!clerkUser) return NextResponse.next(); // If user not found, exit

      await prisma.user.create({
        data: {
          clerkUserId: clerkUser.id,
          name: clerkUser.fullName || "User",
          email: clerkUser.emailAddresses[0]?.emailAddress || "",
          imageUrl: clerkUser.imageUrl || "",
        },
      });
    }
  } catch (error) {
    console.error("Error syncing user in middleware:", error);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
