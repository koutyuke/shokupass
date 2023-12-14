"use client";

import { User } from "@supabase/supabase-js";
import { FC, useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/utils/supabase";

const UserInfo: FC = () => {
  const supabase = createBrowserSupabaseClient();
  const [user, serUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const session = await supabase.auth.getSession();
      serUser(session.data.session?.user ?? null);
    })();
  }, [supabase.auth]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      serUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return <div>{user ? user.id : "no user"}</div>;
};

export { UserInfo };
