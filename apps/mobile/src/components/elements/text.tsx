import { twMerge } from "@shokupass/tailwind-config";
import { ComponentPropsWithoutRef, FC } from "react";
import { Text as DefaultText } from "react-native";

type Props = ComponentPropsWithoutRef<typeof DefaultText>;

const Text: FC<Props> = args => {
  const { className, ...props } = args;
  return <DefaultText className={twMerge("font-mPlusRounded1c", className)} {...props} />;
};

export { Text };
