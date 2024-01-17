import { User } from "@shokupass/api-contracts";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { fetchClient } from "@/utils/fetch";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

const useUserInfo = () => {
  const supabase = createBrowserSupabaseClient();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, newSession) => {
      setSession(newSession);

      if (!newSession) {
        setUser(null);
        return;
      }

      const response = await fetchClient.user.GetMyUser({
        headers: {
          authorization: `Bearer ${newSession.access_token}`,
        },
      });

      if (response.status === 200) {
        setUser(response.body);
        return;
      }
      setUser(null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  if (session && user) {
    return { user, session };
  }

  return {
    user: null,
    session: null,
  };
};

export { useUserInfo };
