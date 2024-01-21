import { Menu } from "@shokupass/api-contracts";
import { Link } from "expo-router";
import { FC } from "react";
import FastImage from "react-native-fast-image";
import { View, Text } from "../elements";

type Props = {
  menu: Menu;
};

const MenuCard: FC<Props> = ({ menu }) => (
  <Link href={`/(withAuth)/menu/${menu.id}`} className="h-fit w-full ">
    <View className="flex w-full min-w-full flex-row border-b-[1px] border-gray-300 p-2" style={{ gap: 12 }}>
      <View className="h-16 w-16 overflow-hidden rounded-lg border-2 border-gray-300">
        <FastImage source={{ uri: menu.image }} className="h-16 w-16" resizeMode={FastImage.resizeMode.stretch} />
      </View>
      <View className="h-fit justify-center">
        <Text className="truncate text-xl ">{menu.name}</Text>
        <Text className="truncate text-lg ">
          {menu.quantity > 0 ? `¥${menu.price} (${menu.quantity}品)` : `¥${menu.price} (売り切れ)`}
        </Text>
      </View>
    </View>
  </Link>
);

export { MenuCard };
