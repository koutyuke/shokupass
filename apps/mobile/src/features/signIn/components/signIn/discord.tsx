import { openAuthSessionAsync } from "expo-web-browser";
import { Button } from "react-native";
import { supabase } from "@/utils/supabase";

const signInWithDiscord = async () => {
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: "shokupass://discord-auth",
    },
  });
  if (error) {
    return;
  }
  const result = await openAuthSessionAsync(data.url, "shokupass://discord-auth?", {
    showInRecents: true,
  });

  if (result && result.type === "success") {
    const parsedUrl = new URL(result.url);
    const urlParams = new URLSearchParams(parsedUrl.hash.replace("#", "?"));

    const paramObject: Record<string, string> = {};
    urlParams.forEach((value, key) => {
      paramObject[key] = value;
    });

    if (paramObject["access_token"] && paramObject["refresh_token"]) {
      await supabase.auth.setSession({
        access_token: paramObject["access_token"],
        refresh_token: paramObject["refresh_token"],
      });
    }
  }
};

const DiscordSignInButton = () => <Button onPress={signInWithDiscord} title="Sign In with Discord" />;

export { DiscordSignInButton };
