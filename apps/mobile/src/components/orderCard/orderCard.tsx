import { Order } from "@shokupass/api-contracts";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import { Link } from "expo-router";
import { FC } from "react";
import { View, Text } from "../elements";
import { StatusBadge } from "./statusBadge";

type Props = {
  order: Order;
};

const OrderCard: FC<Props> = ({ order }) => {
  const createdAt = dayjs(order.createdAt).locale(ja);
  const total = order.items.reduce((acc, item) => acc + item.menu.price * item.quantity, 0);
  return (
    <Link href={`/(withAuth)/orders/${order.id}`}>
      <View className="flex  w-full min-w-full flex-row border-b-[1px] border-gray-300 p-2" style={{ gap: 12 }}>
        <View className="flex h-16 flex-1 flex-col items-center">
          <Text className="text-xl">{createdAt.format("YYYY年MM月DD日")}</Text>
          <Text className="text-xl">{total}円</Text>
        </View>
        <View className="flex h-16 w-fit items-center justify-center ">
          <StatusBadge status={order.status} />
        </View>
      </View>
    </Link>
  );
};

export { OrderCard };
