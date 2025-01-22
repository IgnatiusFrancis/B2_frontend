import { NextResponse } from "next/server";

export async function middleware(req) {
  const { cookies, nextUrl } = req;
  const storedUser = localStorage.getItem("user");
        const token = storedUser ? JSON.parse(storedUser) : null;


  // Extracting the path
  const path = nextUrl.pathname;

  // Check if the route is an admin route
  const isAdminRoute = path.startsWith("/admin");

  // If no token is found or token is invalid, redirect to login
  if (!token || token === null) {
    if (isAdminRoute) {
      
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }
}

// Define paths to protect in the config
export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};
