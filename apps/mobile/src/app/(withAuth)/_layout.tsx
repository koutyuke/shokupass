import { Tabs, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { AccountTabIcon, MenuTabIcon, OrderTabIcon } from "@/components/tabIcon";
import { sessionAtom } from "@/store/session";
import { supabase } from "@/utils/supabase";

const WithWithLayout = () => {
  const [session, setSession] = useAtom(sessionAtom);
  const router = useRouter();
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, afterSession) => {
      setSession(afterSession);

      if (!afterSession) {
        router.push("/(auth)/sign-in");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, setSession]);

  if (session === null) {
    return null;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: OrderTabIcon,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: MenuTabIcon,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: AccountTabIcon,
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default WithWithLayout;
