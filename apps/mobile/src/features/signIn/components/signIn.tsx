import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { sighIn } from "../utils/signIn";

const SignInButton = () => {
  GoogleSignin.configure({
    webClientId: process.env["EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID"]!,
  });
  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Standard}
      color={GoogleSigninButton.Color.Dark}
      onPress={async () => {
        // console.log("google sign in");
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          if (userInfo.idToken) {
            await sighIn(userInfo.idToken);
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

export { SignInButton };
