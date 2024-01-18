import { Avatar } from "@mantine/core";
import { User } from "@shokupass/api-contracts";
import { FC } from "react";

type Props = {
  user: User;
};

const UserAvatar: FC<Props> = ({ user }) => (
  <Avatar className="outline outline-1 outline-gray-300" radius="xl" src={user.iconImage} />
);

export { UserAvatar };
