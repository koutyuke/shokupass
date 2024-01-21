import { View } from "@/components/elements";
import { AuthUser } from "@/components/user";
import { SignOutButton } from "@/features/signIn/components/signOut/signOut";

const App = () => (
  <View className="flex-1 items-center justify-center bg-gray-100">
    <SignOutButton />
    <AuthUser />
  </View>
);

export default App;
