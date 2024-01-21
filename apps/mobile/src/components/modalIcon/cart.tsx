import { CartIcon } from "@shokupass/ui/components/mobile/icon/cart";
import { useRouter } from "expo-router";
import { useAtomValue } from "jotai";
import { View, Text, Button } from "../elements";
import { CartAtom } from "@/store/cart";

const CartModalIcon = () => {
  const cart = useAtomValue(CartAtom);
  const router = useRouter();
  return (
    <Button
      onPress={() => router.push("/(withAuth)/menu/cart")}
      className="absolute bottom-4 right-4 h-12 w-12"
      style={{
        borderRadius: 9999,
      }}
    >
      <View className="relative flex h-full w-full items-center justify-center rounded-full  border border-gray-300 bg-white">
        <CartIcon size={30} />
        <View
          className="absolute -left-2 -top-2 h-6 w-6 rounded-full bg-red-400"
          style={{
            position: "absolute",
          }}
        >
          <Text className="h-fit translate-y-[-2px] text-center align-middle text-xl text-white">
            {cart.length > 9 ? 9 : cart.length}
          </Text>
        </View>
      </View>
    </Button>
  );
};

export { CartModalIcon };
