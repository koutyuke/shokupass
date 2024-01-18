import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareSupabaseClient } from "./utils/supabase/client";

const middleware = async (request: NextRequest) => {
  const { supabase, response } = createMiddlewareSupabaseClient(request);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && !request.url.includes("/sign-in")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  if (session && request.url.includes("/sign-in")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return response;
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - / (root path)
     * - /auth (auth routes)
     * - /api (API routes)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|$|auth|api).*)",
  ],
};

export default middleware;
