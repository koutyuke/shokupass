"use client";

import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";
import { sessionAtom } from "@/store/session";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

type Props = {
  children: ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const supabase = createBrowserSupabaseClient();
  const setSession = useSetAtom(sessionAtom);
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (event === "SIGNED_OUT" || newSession === null) {
        setSession(null);
        router.push("/sign-in");
      } else {
        setSession(newSession);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, setSession, supabase.auth]);

  return <> {children}</>;
};

export { AuthProvider };
