import { Stack } from "expo-router";

const Layout = () => (
  <Stack>
    <Stack.Screen
      name="index"
      options={{
        title: "Orders",
      }}
    />
    <Stack.Screen
      name="[id]"
      options={{
        title: "Detail Order",
        presentation: "modal",
      }}
    />
  </Stack>
);

export default Layout;
