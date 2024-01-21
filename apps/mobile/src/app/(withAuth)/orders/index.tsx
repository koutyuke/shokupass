import { ScrollView } from "react-native";
import { View, Text } from "@/components/elements";
import { OrderCard } from "@/components/orderCard/orderCard";
import { useGetMyOrders } from "@/hooks/swr/useGetMyOrders";

const Orders = () => {
  const { data, isLoading, error } = useGetMyOrders();

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (!data || isLoading) {
    return <Text>Loading...</Text>;
  }

  const orders = [...data].sort((a, b) => {
    if (a.status === b.status) {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    }
    if (a.status === "PAYMENT") {
      return -1;
    }
    if (b.status === "PAYMENT") {
      return 1;
    }
    if (a.status === "READY_FOR_PICKUP") {
      return -1;
    }
    if (b.status === "READY_FOR_PICKUP") {
      return 1;
    }
    if (a.status === "COOKING") {
      return -1;
    }
    if (b.status === "COOKING") {
      return 1;
    }
    if (a.status === "COMPLETED") {
      return 1;
    }
    if (b.status === "COMPLETED") {
      return -1;
    }

    return 0;
  });

  return (
    <View className="h-full w-full">
      <ScrollView>
        <View className="flex min-h-full min-w-full flex-col p-4" style={{ gap: 8 }}>
          {orders.map(order => (
            <OrderCard order={order} key={order.id} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Orders;
