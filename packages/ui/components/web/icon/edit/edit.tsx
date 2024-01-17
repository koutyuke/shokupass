import { Pencil as Icon } from "lucide-react";
import { ComponentProps, FC } from "react";

type Props = Omit<ComponentProps<typeof Icon>, "absoluteStrokeWidth">;

export const EditIcon: FC<Props> = props => <Icon {...props} />;
