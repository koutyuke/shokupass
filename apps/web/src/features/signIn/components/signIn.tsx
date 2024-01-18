"use client";

import { Button } from "@mantine/core";
import DiscordIcon from "@shokupass/ui/assets/social/discord.svg";
import GoogleIcon from "@shokupass/ui/assets/social/google.svg";
import { Image } from "@shokupass/ui/components/web/image";
import { FC } from "react";
import { signInWithGoogle, signInWithDiscord } from "../utils";

const SignInWithGoogleButton: FC = () => (
  <Button
    onClick={signInWithGoogle}
    variant="default"
    color="gray"
    size="md"
    className="font-bold"
    justify="start"
    aria-label="Sign in with Google"
    leftSection={<Image src={GoogleIcon} alt="google icon" priority height={32} />}
  >
    Sign in with Google
  </Button>
);

const SignInWithDiscordButton: FC = () => (
  <Button
    onClick={signInWithDiscord}
    variant="default"
    color="gray"
    size="md"
    className="font-bold"
    aria-label="Sign in with Discord"
    justify="start"
    leftSection={<Image src={DiscordIcon} alt="google icon" priority height={32} />}
  >
    Sign in with Discord
  </Button>
);

export { SignInWithGoogleButton, SignInWithDiscordButton };
