import { ShoppingCart as Icon } from "lucide-react-native";
import { ComponentProps, FC } from "react";

type Props = Omit<ComponentProps<typeof Icon>, "absoluteStrokeWidth">;

export const CartIcon: FC<Props> = props => <Icon {...props} />;
