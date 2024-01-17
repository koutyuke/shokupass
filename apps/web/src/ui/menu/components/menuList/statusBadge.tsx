import { Badge } from "@mantine/core";
import { MenuStatusEnum, MenuStatusType } from "@shokupass/api-contracts";
import { FC } from "react";

type Props = {
  status: MenuStatusType | "SOLD_OUT";
};

const MenuStatusBadge: FC<Props> = ({ status }) => {
  switch (status) {
    case MenuStatusEnum.AVAILABLE:
      return (
        <Badge color="green" size="lg" radius="lg">
          販売中
        </Badge>
      );
    case MenuStatusEnum.PREPARATION:
      return (
        <Badge color="yellow" size="lg" radius="lg">
          準備中
        </Badge>
      );
    case "SOLD_OUT":
      return (
        <Badge color="red" size="lg" radius="lg">
          売り切れ
        </Badge>
      );
    default:
      return null;
  }
};

export { MenuStatusBadge };
