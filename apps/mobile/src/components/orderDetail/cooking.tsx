import { FC } from "react";
import { View, Text } from "../elements";

const Cooking: FC = () => (
  <View className="flex flex-col items-center">
    <Text className="text-center text-xl">調理中</Text>
    <Text className="text-center text-xl">お待ちください</Text>
  </View>
);

export { Cooking };
