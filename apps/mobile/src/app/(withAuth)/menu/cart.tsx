import { Link, useRouter } from "expo-router";
import { useAtom, useAtomValue } from "jotai";
import { FC, useState } from "react";
import { ScrollView } from "react-native";
import Image from "react-native-fast-image";
import { View, Text, Button } from "@/components/elements";
import { useGetMenus } from "@/hooks/swr/useGetMenus";
import { CartAtom } from "@/store/cart";
import { sessionAtom } from "@/store/session";
import { fetchClient } from "@/utils/fetch/fetchClient";

const Cart: FC = () => {
  const [cart, setCart] = useAtom(CartAtom);
  const [isLoading, setIsLoading] = useState(false);
  const { data: menus, error } = useGetMenus();
  const router = useRouter();
  const session = useAtomValue(sessionAtom);

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (!menus) {
    return <Text>Loading...</Text>;
  }

  if (cart.length === 0) {
    return (
      <View className="flex h-full w-full flex-col items-center justify-center bg-white p-4" style={{ gap: 16 }}>
        <Text className="text-2xl ">カートに商品がありません</Text>
        <Button
          onPress={() => {
            router.replace("/(withAuth)/menu");
          }}
          className="mx-auto flex h-12 w-64 items-center justify-center bg-blue-400 text-white"
        >
          <Text className="text-white">メニューに戻る</Text>
        </Button>
      </View>
    );
  }

  const cartMenus = cart
    .map(item => {
      const menu = menus.find(m => m.id === item.menuId);
      if (!menu) {
        return {
          menu: null,
          quantity: 0,
        };
      }
      return {
        menu,
        quantity: menu.quantity < item.quantity ? menu.quantity : item.quantity,
      };
    })
    .filter(i => i.menu !== null && i.menu.quantity !== 0) as { menu: (typeof menus)[0]; quantity: number }[];

  const totalPrice = cartMenus.reduce((acc, cur) => acc + cur.menu.price * cur.quantity, 0);

  return (
    <>
      {isLoading && (
        <View className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black/50">
          <View className="flex h-16 w-32 items-center justify-center rounded-lg bg-white">
            <Text className="text-xl">注文中...</Text>
          </View>
        </View>
      )}
      <View className="relative flex h-full w-full flex-col px-4 pb-12 pt-8" style={{ gap: 16 }}>
        <View className="flex-1">
          <ScrollView className="gap-y-2 divide-y divide-gray-300">
            {cartMenus.map(({ menu, quantity }) => (
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
                <Text className="w-8 text-2xl">×{quantity}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View className="w-full">
          <Text className="text-center text-xl">合計 {totalPrice}円</Text>
          <Text className="text-center text-base">支払い：PayPayのみ</Text>
          <Button
            onPress={async () => {
              setIsLoading(true);

              const res = await fetchClient.order.CreateOrder({
                headers: {
                  authorization: `Bearer ${session?.access_token}`,
                },
                body: {
                  items: cartMenus.map(({ menu, quantity }) => ({
                    menuId: menu.id,
                    quantity,
                  })),
                },
              });
              setIsLoading(false);
              setCart([]);

              router.replace("../");
              setTimeout(() => {
                router.push(res.status === 200 ? `/(withAuth)/orders/${res.body.id}` : "/(withAuth)/menu");
              }, 300);
            }}
            className="mx-auto flex h-12 w-64 items-center justify-center bg-blue-400 text-white"
          >
            <Text className="text-white">注文を確定する</Text>
          </Button>
        </View>
      </View>
    </>
  );
};

export default Cart;
