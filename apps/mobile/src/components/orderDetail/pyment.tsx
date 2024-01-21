import { Order } from "@shokupass/api-contracts";
import * as Linking from "expo-linking";
import { FC, useEffect } from "react";
import { View, Text, Button } from "../elements";
import { useGetMyOrderPayment } from "@/hooks/swr/useGetMyOrderPyment";

type Props = {
  order: Order;
  orderMutate: () => void;
};

const Payment: FC<Props> = ({ order, orderMutate }) => {
  const { data, error, mutate } = useGetMyOrderPayment(order.id, order.payment);

  useEffect(() => {
    const interval = setInterval(() => {
      mutate();
    }, 2000);
    return () => clearInterval(interval);
  }, [mutate]);

  if (error && !data) {
    return <Text>{error.message}</Text>;
  }

  if (!data) {
    return <Text>Loading...</Text>;
  }

  if (data.status === "COMPLETED") {
    orderMutate();
    return null;
  }

  return (
    <View className="flex h-32 flex-col items-center">
      <Text className="h-10 text-center text-lg text-red-500">支払いが完了していません!</Text>
      <Button
        className="flex h-20 w-full items-center justify-center rounded-xl bg-red-500"
        onPress={() => {
          Linking.openURL(data.deeplink);
        }}
        style={{ gap: 6 }}
      >
        <Text className="text-xl text-white">PayPayで支払う</Text>
        <Text className="text-white">*支払い後必ずこのアプリに戻ってきてください</Text>
      </Button>
    </View>
  );
};

export { Payment };
