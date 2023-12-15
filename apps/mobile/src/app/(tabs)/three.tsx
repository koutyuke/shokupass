import { View } from "react-native";
import { AuthUser } from "@/components/user";
import { GoogleSignInButton, DiscordSignInButton } from "@/features/signIn/components/signIn";
import { SignOutButton } from "@/features/signIn/components/signOut/signOut";

const App = () => (
  <View className="flex-1 items-center justify-center bg-gray-100">
    <GoogleSignInButton />
    <DiscordSignInButton />
    <SignOutButton />
    <AuthUser />
  </View>
);

export default App;
