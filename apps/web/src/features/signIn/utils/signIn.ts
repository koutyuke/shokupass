import { createBrowserSupabaseClient } from "@/utils/supabase";

const signIn = async () => {
  const supabase = createBrowserSupabaseClient();
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback/",
    },
  });
};

export { signIn };
