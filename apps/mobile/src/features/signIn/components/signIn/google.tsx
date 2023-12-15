import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { supabase } from "@/utils/supabase";

const GoogleSignInButton = () => {
  GoogleSignin.configure({
    webClientId: process.env["EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID"]!,
  });
  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Standard}
      color={GoogleSigninButton.Color.Dark}
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
    />
  );
};

export { GoogleSignInButton };
