import { Button } from "react-native";
import { signOut } from "../utils/signOut";

const SignOutButton = () => <Button title="Sign Out" onPress={signOut} />;

export { SignOutButton };
