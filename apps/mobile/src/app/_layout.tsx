import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts, MPLUSRounded1c_500Medium, MPLUSRounded1c_700Bold } from "@expo-google-fonts/m-plus-rounded-1c";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export { ErrorBoundary } from "expo-router";

export const unstableSettings = {
  initialRouteName: "(withAuth)/account",
};

SplashScreen.preventAutoHideAsync();

const RootLayoutNav = () => (
  <ThemeProvider value={DefaultTheme}>
    <Stack>
      <Stack.Screen name="(withAuth)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  </ThemeProvider>
);

const RootLayout = () => {
  const [loaded, error] = useFonts({
    MPLUSRounded1c_500Medium,
    MPLUSRounded1c_700Bold,
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
};

export default RootLayout;
