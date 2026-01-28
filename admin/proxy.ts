import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("access_token");

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!token && pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔹 Redirect "/" based on authentication status
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(token ? "/dashboard" : "/login", req.url),
    );
  }

  // 3️⃣ Allow everything else
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/login"], 
};

