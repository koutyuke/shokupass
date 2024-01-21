import DiscordIcon from "@shokupass/ui/assets/social/discord.svg";
import { Text, TouchableOpacity } from "react-native";
import { signInWithDiscord } from "../../utils/signIn";

const DiscordSignInButton = () => (
  <TouchableOpacity
    className="box-border h-12 w-64  flex-row items-center gap-x-2 rounded-lg border-2 border-gray-300 p-0"
    onPress={signInWithDiscord}
  >
    <DiscordIcon width={32} height={32} />
    <Text className="flex-1 font-mPlusRounded1c text-xl">Sign in with Discord</Text>
  </TouchableOpacity>
);

export { DiscordSignInButton };
