"use client";

import { Session, User } from "@supabase/supabase-js";
import { FC, useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/utils/supabase";

const UserInfo: FC = () => {
  const supabase = createBrowserSupabaseClient();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    (async () => {
      const newSession = await supabase.auth.getSession();
      setSession(newSession.data.session ?? null);
      setUser(newSession.data.session?.user ?? null);
    })();
  }, [supabase.auth]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    <>
      <div>{user ? user.id : "no user"}</div>
      <div>
        <button
          type="button"
          onClick={() => {
            console.log(session?.access_token);
          }}
        >
          show session
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            console.log(JSON.stringify(user, null, 2));
          }}
        >
          show user
        </button>
      </div>
    </>
  );
};

export { UserInfo };
