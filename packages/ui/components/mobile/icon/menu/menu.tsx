import { MenuSquare as Icon } from "lucide-react-native";
import { ComponentProps, FC } from "react";

type Props = Omit<ComponentProps<typeof Icon>, "absoluteStrokeWidth">;

export const MenuIcon: FC<Props> = props => <Icon {...props} />;
