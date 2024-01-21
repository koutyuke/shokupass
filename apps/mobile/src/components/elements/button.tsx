import { twMerge } from "@shokupass/tailwind-config";
import { ComponentPropsWithoutRef, FC } from "react";
import { TouchableOpacity as DefaultTouchableOpacity } from "react-native";

type Props = ComponentPropsWithoutRef<typeof DefaultTouchableOpacity>;

const Button: FC<Props> = args => {
  const { className, ...props } = args;
  return <DefaultTouchableOpacity className={twMerge("h-8 rounded-lg font-mPlusRounded1c", className)} {...props} />;
};

export { Button };
