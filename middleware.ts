import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export function middleware(req: NextRequest) {
  console.log(req.nextUrl);
  if (req.nextUrl.pathname.startsWith("/api/socket/messages")) {
    console.log("hello");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/uploadthing", "/"],
};
