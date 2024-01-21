import { Order } from "@shokupass/api-contracts";
import { FC } from "react";
import QRCode from "react-native-qrcode-svg";
import { View, Text } from "../elements";

type Props = {
  order: Order;
};

const ReadyForPickup: FC<Props> = ({ order }) => (
  <View className="space-y-2">
    <Text className="text-center text-xl">お待たせしました!</Text>
    <Text className="text-center text-lg">QRコードをカメラにかざしてください。</Text>
    <View className="flex items-center justify-center">
      <QRCode value={`${order.id}.${order.locker?.id}`} size={200} />
    </View>
  </View>
);

export { ReadyForPickup };
