"use client";

import { Button, Popover } from "@mantine/core";
import { User } from "@shokupass/api-contracts";
import { LogOutIcon } from "@shokupass/ui/components/web/icon/logout";
import { FC } from "react";
import { UserAvatar } from "@/components/avatar";

type Props = {
  user: User;
  signOut: VoidFunction;
};

const UserMenuPopover: FC<Props> = ({ user, signOut }) => (
  <Popover position="bottom-end" offset={6} withArrow arrowPosition="center" shadow="md" zIndex={1000}>
    <Popover.Target>
      <button type="button" aria-label="Open User Setting Menu">
        <UserAvatar user={user} />
      </button>
    </Popover.Target>
    <Popover.Dropdown>
      <div className="w-full text-center text-xl">
        <span>{user.name}</span>
      </div>
      <Button
        variant="transparent"
        leftSection={<LogOutIcon strokeWidth={3} className="stroke-red-500" size={16} />}
        onClick={signOut}
        className="mt-2 transition hover:bg-red-400/50"
      >
        <span className="font-bold text-red-500">Sign Out</span>
      </Button>
    </Popover.Dropdown>
  </Popover>
);

export { UserMenuPopover };
