import { OrderStatusType } from "@shokupass/api-contracts";
import { FC } from "react";
import { View, Text } from "../elements";

type Props = {
  status: OrderStatusType;
};

const StatusBadge: FC<Props> = ({ status }) => {
  switch (status) {
    case "PAYMENT":
      return (
        <View className="flex  h-12 w-24 items-center justify-center rounded-lg bg-red-500">
          <Text className="text-white">支払い待ち</Text>
        </View>
      );
    case "COOKING":
      return (
        <View className="flex  h-12 w-24 items-center justify-center rounded-lg bg-yellow-400">
          <Text className="text-white">調理中</Text>
        </View>
      );
    case "READY_FOR_PICKUP":
      return (
        <View className="flex h-12 w-24 items-center justify-center rounded-lg bg-blue-400">
          <Text className="text-white">受け取り待ち</Text>
        </View>
      );
    case "PENDING":
      return (
        <View className="flex h-12 w-24 items-center justify-center rounded-lg bg-gray-400">
          <Text className="text-white">準備中</Text>
        </View>
      );
    case "COMPLETED":
      return (
        <View className="flex h-12 w-24 items-center justify-center rounded-lg bg-green-400">
          <Text className="text-white">受け取り済み</Text>
        </View>
      );
    default:
      return null;
  }
};

export { StatusBadge };
