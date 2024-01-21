import { AccountIcon } from "@shokupass/ui/components/mobile/icon/account";
import { View, Text } from "react-native";
import { DiscordSignInButton, GoogleSignInButton } from "@/features/signIn/components/signIn";

const SignInPage = () => (
  <View className="flex h-full w-full flex-col items-center justify-center space-y-2 bg-gray-100" style={{ gap: 16 }}>
    <View className="flex w-full flex-col items-center">
      <AccountIcon size={72} stroke="#1f2937" />
      <Text className="font-mPlusRounded1cBold text-2xl font-bold"> Sign in & Sign up</Text>
    </View>
    <View
      className="flex flex-col items-center"
      style={{
        gap: 8,
      }}
    >
      <GoogleSignInButton />
      <DiscordSignInButton />
    </View>
  </View>
);

export default SignInPage;
