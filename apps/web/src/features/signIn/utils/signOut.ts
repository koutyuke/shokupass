import { createBrowserSupabaseClient } from "@/utils/supabase/client";

const signOut = async () => {
  const supabase = createBrowserSupabaseClient();
  const { error } = await supabase.auth.signOut();
  return error;
};

export { signOut };
