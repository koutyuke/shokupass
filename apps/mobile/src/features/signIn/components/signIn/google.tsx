import { GoogleSignin } from "@react-native-google-signin/google-signin";
import GoogleIcon from "@shokupass/ui/assets/social/google.svg";
import { TouchableOpacity, Text } from "react-native";
import { supabase } from "@/utils/supabase";

const GoogleSignInButton = () => {
  GoogleSignin.configure({
    webClientId: process.env["EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID"]!,
  });
  return (
    <TouchableOpacity
      className="box-border h-12 w-64 flex-row  items-center gap-x-2 rounded-lg border-2 border-gray-300 p-0"
      onPress={async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          if (userInfo.idToken) {
            await supabase.auth.signInWithIdToken({ provider: "google", token: userInfo.idToken });
          } else {
            throw new Error("no ID token present!");
          }
        } catch (error: unknown) {
          // eslint-disable-next-line no-console
          console.log("catch error", JSON.stringify(error, null, "\t"));
        }
      }}
    >
      <GoogleIcon width={32} height={32} />
      <Text className="flex-1 font-mPlusRounded1c text-xl">Sign in with Google</Text>
    </TouchableOpacity>
  );
};

export { GoogleSignInButton };
