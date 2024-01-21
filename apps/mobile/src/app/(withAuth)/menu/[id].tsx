import { useLocalSearchParams, useRouter } from "expo-router";
import { useSetAtom } from "jotai";
import { useState } from "react";
import FastImage from "react-native-fast-image";
import { View, Text, Button } from "@/components/elements";
import { useGetMenu } from "@/hooks/swr/useGetMenu";
import { CartAtom } from "@/store/cart";

const MenuModal = () => {
  const { id: pathParam } = useLocalSearchParams();
  const id = pathParam as string;
  const { data, isLoading } = useGetMenu(id);
  const router = useRouter();

  const [addCount, setAddCount] = useState(0);
  const setCart = useSetAtom(CartAtom);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!data) {
    return <Text>Not Found</Text>;
  }

  return (
    <View className="flex h-full w-full flex-col items-center justify-start bg-white p-4" style={{ gap: 16 }}>
      <View className="h-48 w-48 overflow-hidden rounded-lg border-2 border-gray-300">
        <FastImage source={{ uri: data.image }} className="h-48 w-48" resizeMode={FastImage.resizeMode.stretch} />
      </View>
      <View className="h-fit items-center justify-center" style={{ gap: 4 }}>
        <Text className="text-2xl ">{data.name}</Text>
        <Text className="text-xl ">¥{data.price}</Text>
        <Text className="text-xl">{data.quantity > 0 ? `残り${data.quantity}品` : "売り切れ"}</Text>
        <View className="h-64 w-72 rounded-lg border-2 border-gray-300 p-2">
          <Text className="text-xl ">{data.description}</Text>
        </View>
      </View>
      {data.quantity > 0 && (
        <View className="mt-8 flex flex-row">
          <Button
            className="h-12 w-12 rounded-none rounded-l-lg bg-blue-400"
            onPress={() => {
              if (addCount > 0) {
                setAddCount(addCount - 1);
              }
            }}
          >
            <Text className="m-auto inline-block text-center text-2xl text-white">-</Text>
          </Button>
          <Button
            className="h-12 w-32 rounded-none border-x-2 border-white bg-blue-400"
            onPress={() => {
              if (addCount !== 0) {
                setCart(cart => {
                  const newCart = [...cart];
                  const sameMenu = newCart.findIndex(item => item.menuId === data.id);

                  if (sameMenu === -1) {
                    newCart.push({
                      menuId: data.id,
                      quantity: addCount,
                    });
                  } else {
                    newCart[sameMenu]!.quantity += addCount;
                  }

                  return newCart;
                });
              }
              setAddCount(0);
              router.push("/(withAuth)/menu/");
            }}
          >
            <Text className="my-auto inline-block text-center text-2xl text-white">{addCount}個追加</Text>
          </Button>
          <Button
            className="h-12 w-12 rounded-none rounded-r-lg bg-blue-400"
            onPress={() => {
              if (addCount < data.quantity) {
                setAddCount(addCount + 1);
              }
            }}
          >
            <Text className="m-auto inline-block text-center text-2xl text-white">+</Text>
          </Button>
        </View>
      )}
    </View>
  );
};

export default MenuModal;
