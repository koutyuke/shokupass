import { createBrowserSupabaseClient } from "@/utils/supabase";

const signOut = async () => {
  const supabase = createBrowserSupabaseClient();
  const { error } = await supabase.auth.signOut();
  return error;
};

export { signOut };
