import { createBrowserSupabaseClient } from "@/utils/supabase/client";

const baseUrl = process.env["NEXT_PUBLIC_SITE_BASE_URL"]!;

const signInWithGoogle = async () => {
  const supabase = createBrowserSupabaseClient();
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${baseUrl}/auth/callback/`,
    },
  });
};

const signInWithDiscord = async () => {
  const supabase = createBrowserSupabaseClient();
  await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: `${baseUrl}/auth/callback/`,
    },
  });
};

export { signInWithGoogle, signInWithDiscord };
