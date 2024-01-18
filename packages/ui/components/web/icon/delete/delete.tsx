import { Trash2 as Icon } from "lucide-react";
import { ComponentProps, FC } from "react";

type Props = Omit<ComponentProps<typeof Icon>, "absoluteStrokeWidth">;

export const DeleteIcon: FC<Props> = props => <Icon {...props} />;
