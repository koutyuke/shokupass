import { Button } from "react-native";
import { supabase } from "@/utils/supabase";

const SignOutButton = () => (
  <Button
    title="Sign Out"
    onPress={async () => {
      await supabase.auth.signOut();
    }}
  />
);

export { SignOutButton };
