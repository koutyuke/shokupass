import { twMerge } from "@shokupass/tailwind-config";
import { ComponentPropsWithoutRef, FC } from "react";
import { View as DefaultView } from "react-native";

type Props = ComponentPropsWithoutRef<typeof DefaultView>;

const View: FC<Props> = args => {
  const { className, ...props } = args;
  return <DefaultView className={twMerge("bg-white font-mPlusRounded1c", className)} {...props} />;
};

export { View };
