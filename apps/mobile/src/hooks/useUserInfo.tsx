import { Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

const useUserInfo = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, afterSession) => {
      setUser(afterSession?.user ?? null);
      setSession(afterSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, session };
};

export { useUserInfo };
