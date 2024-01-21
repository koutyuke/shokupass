import { openAuthSessionAsync } from "expo-web-browser";
import { supabase } from "@/utils/supabase";

const sighInWithGoogle = async (token: string) => {
  await supabase.auth.signInWithIdToken({
    provider: "google",
    token,
  });
};

const signInWithDiscord = async () => {
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: "shokupass://sign-in",
    },
  });
  if (error) {
    return;
  }
  const result = await openAuthSessionAsync(data.url, "shokupass://", {
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

export { sighInWithGoogle, signInWithDiscord };
