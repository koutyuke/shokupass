import { Redirect, Stack } from "expo-router";
import { useAtomValue } from "jotai";
import { sessionAtom } from "@/store/session";

const Layout = () => {
  const session = useAtomValue(sessionAtom);

  if (session) {
    return <Redirect href="/(withAuth)/menu" />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default Layout;
