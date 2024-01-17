import { AccountIcon } from "@shokupass/ui/components/web/icon/account";
import { FC } from "react";
import { SignInWithGoogleButton, SignInWithDiscordButton } from "@/features/signIn/components";

const PageContents: FC = () => (
  <div className="flex flex-col items-center">
    <AccountIcon size={100} strokeWidth={1.5} className="stroke-gray-800" />
    <p className="text-2xl font-bold">Sign in & Sign up</p>
    <div className="mt-6 flex flex-col space-y-2">
      <SignInWithGoogleButton />
      <SignInWithDiscordButton />
    </div>
  </div>
);

export { PageContents };
