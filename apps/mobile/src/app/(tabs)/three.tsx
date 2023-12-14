import { View } from "react-native";
import { AuthUser } from "@/components/user";
import { SignInButton } from "@/features/signIn/components/signIn";
import { SignOutButton } from "@/features/signIn/components/signOut";

const App = () => (
  <View className="flex-1 items-center justify-center bg-gray-100">
    <SignInButton />
    <SignOutButton />
    <AuthUser />
  </View>
);

export default App;
