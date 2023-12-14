import { supabase } from "@/utils/supabase";

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
};

export { signOut };
