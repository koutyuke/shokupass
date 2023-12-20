import { Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Button, Text } from "react-native";
import { supabase } from "@/utils/supabase";

const AuthUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
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

  return (
    <>
      <Text className="mt-10 text-xl text-gray-500">{user?.id ?? "no user"}</Text>
      <Button
        onPress={() => {
          console.log(JSON.stringify(session, null, 2));
        }}
        title="show session"
      />
    </>
  );
};

export { AuthUser };
