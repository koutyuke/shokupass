import { FC } from "react";
import { AccountIcon } from "#ui/components/mobile/icon/account";

type Props = {
  focused: boolean;
  color: string;
  size: number;
};

const AccountTabIcon: FC<Props> = ({ focused, size, color }) => (
  <AccountIcon size={size} stroke={focused ? color : "#1e293b"} />
);

export { AccountTabIcon };
