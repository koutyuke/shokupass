import { ScrollView } from "react-native";
import { View, Text } from "@/components/elements";
import { MenuCard } from "@/components/menuCard";
import { CartModalIcon } from "@/components/modalIcon/cart";
import { useGetMenus } from "@/hooks/swr/useGetMenus";

const Menu = () => {
  const { data, error, isLoading } = useGetMenus();

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (!data || isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className="relative h-full w-full">
      <ScrollView>
        <View className="flex min-h-full min-w-full flex-col p-4" style={{ gap: 8 }}>
          {data.map(menu => (
            <MenuCard menu={menu} key={menu.id} />
          ))}
        </View>
      </ScrollView>
      <CartModalIcon />
    </View>
  );
};

export default Menu;
