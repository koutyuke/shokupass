import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import Image from "react-native-fast-image";
import { View, Text } from "@/components/elements";
import { StatusMessage } from "@/components/orderDetail/status";
import { useGetMyOrder } from "@/hooks/swr/useGetMyOrder";

const OrderDetail = () => {
  const { id: pathParam } = useLocalSearchParams();
  const id = pathParam as string;
  const { data, isLoading, mutate } = useGetMyOrder(id);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!data) {
    return <Text>Not Found</Text>;
  }

  const totalPrice = data.items.reduce((acc, cur) => acc + cur.menu.price * cur.quantity, 0);

  return (
    <ScrollView className="relative flex w-full flex-col space-y-0 bg-white p-4">
      <View className="p-2">
        <StatusMessage order={data} orderMutate={mutate} />
      </View>
      <View className="flex-1 gap-y-2 divide-y divide-gray-300">
        <Text className="text-center text-xl">合計 {totalPrice}円</Text>
        {data.items.map(({ menu, quantity }) => (
          <View
            className="flex flex-row items-center pt-2"
            key={menu.id}
            style={{
              gap: 12,
            }}
          >
            <View className="h-16 w-16 overflow-hidden rounded-lg border-2 border-gray-300">
              <Image source={{ uri: menu.image }} className="h-16 w-16" />
            </View>
            <View className="flex-1">
              <Text className="truncate text-xl">{menu.name}</Text>
              <Text>¥{menu.price}</Text>
            </View>
            <Text className="w-8 items-center text-2xl">×{quantity}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default OrderDetail;
