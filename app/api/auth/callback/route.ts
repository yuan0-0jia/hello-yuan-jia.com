import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin =
    process.env.NODE_ENV === "development"
      ? new URL(request.url).origin
      : process.env.NEXT_PUBLIC_URL;

  console.log("Origin:", origin);

  // Check for OAuth error and redirect to error page
  const error = searchParams.get("error");
  if (error) {
    return NextResponse.redirect(
      `${origin}/error?error=${encodeURIComponent(error)}`
    );
  }

  // Handle successful OAuth code
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error: sessionError } = await supabase.auth.exchangeCodeForSession(
      code
    );

    if (!sessionError) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      const redirectBase = isLocalEnv
        ? origin
        : forwardedHost
        ? `https://${forwardedHost}`
        : origin;

      return NextResponse.redirect(`${redirectBase}${next}`);
    }
  }

  // If code is missing or session exchange failed, redirect to error page
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
