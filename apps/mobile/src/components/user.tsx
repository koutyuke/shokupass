import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { supabase } from "@/utils/supabase";

const AuthUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <Text className="mt-10 text-xl text-gray-500">{user?.id ?? "no user"}</Text>;
};

export { AuthUser };
