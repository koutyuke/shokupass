import { FC } from "react";
import { OrderIcon } from "#ui/components/mobile/icon/order";

type Props = {
  focused: boolean;
  color: string;
  size: number;
};

const OrderTabIcon: FC<Props> = ({ focused, size, color }) => (
  <OrderIcon size={size} stroke={focused ? color : "#1e293b"} />
);

export { OrderTabIcon };
