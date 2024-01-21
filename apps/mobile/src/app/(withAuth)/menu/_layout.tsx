import { Stack } from "expo-router";

const Layout = () => (
  <Stack>
    <Stack.Screen
      name="index"
      options={{
        title: "Menu",
      }}
    />
    <Stack.Screen
      name="[id]"
      options={{
        title: "Detail Menu",
        presentation: "modal",
      }}
    />
    <Stack.Screen
      name="cart"
      options={{
        title: "Cart",
        presentation: "modal",
      }}
    />
  </Stack>
);

export default Layout;
