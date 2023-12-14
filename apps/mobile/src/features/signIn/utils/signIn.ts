import { supabase } from "@/utils/supabase";

const sighIn = async (token: string) => {
  await supabase.auth.signInWithIdToken({
    provider: "google",
    token,
  });
};

export { sighIn };
