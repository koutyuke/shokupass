import { Order } from "@shokupass/api-contracts";
import { FC } from "react";
import { Completed } from "./completed";
import { Cooking } from "./cooking";
import { Payment } from "./pyment";
import { ReadyForPickup } from "./readyForPickup";

type Props = {
  order: Order;
  orderMutate: () => void;
};

const StatusMessage: FC<Props> = ({ order, orderMutate }) => {
  switch (order.status) {
    case "PAYMENT":
      return <Payment order={order} orderMutate={orderMutate} />;
    case "COOKING":
      return <Cooking />;
    case "COMPLETED":
      return <Completed />;
    case "READY_FOR_PICKUP":
      return <ReadyForPickup order={order} />;
    default:
      return null;
  }
};

export { StatusMessage };
