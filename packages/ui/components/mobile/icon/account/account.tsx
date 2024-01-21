import { UserRoundIcon as Icon } from "lucide-react-native";
import { ComponentProps, FC } from "react";

type Props = Omit<ComponentProps<typeof Icon>, "absoluteStrokeWidth">;

export const AccountIcon: FC<Props> = props => <Icon {...props} />;
