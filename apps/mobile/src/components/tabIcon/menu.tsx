import { FC } from "react";
import { MenuIcon } from "#ui/components/mobile/icon/menu";

type Props = {
  focused: boolean;
  color: string;
  size: number;
};

const MenuTabIcon: FC<Props> = ({ focused, size, color }) => (
  <MenuIcon size={size} stroke={focused ? color : "#1e293b"} />
);

export { MenuTabIcon };
