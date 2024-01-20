"use client";

import { LogOutIcon } from "#ui/components/web/icon";
import { Link } from "#ui/components/web/link";
import { Avatar, Button, Popover } from "@mantine/core";
import { User } from "@shokupass/api-contracts";
import { FC } from "react";
import useSWR from "swr";
import { useSession } from "@/hooks";
import { fetchClient } from "@/utils/fetch";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

type Props = {
  serverData: User | null;
};

const UserPanel: FC<Props> = ({ serverData }) => {
  const supabase = createBrowserSupabaseClient();
  const session = useSession();

  const { data: user, error } = useSWR<User | null>(
    session ? "GetMyUser" : null,
    () =>
      fetchClient.user
        .GetMyUser({
          headers: {
            authorization: `Bearer ${session!.access_token}`,
          },
        })
        .then(r => (r.status === 200 ? r.body : null)),
    {
      fallbackData: serverData,
    },
  );

  if (error) return null;

  if (!user || !session) {
    return (
      <Link
        href="/sign-in"
        className="flex h-10 place-items-center rounded-lg border border-gray-300 px-6 transition hover:bg-gray-300/10"
      >
        <span className="text-lg font-bold">Sign in</span>
      </Link>
    );
  }

  return (
    <Popover position="bottom-end" offset={6} withArrow arrowPosition="center" shadow="md" zIndex={1000}>
      <Popover.Target>
        <button type="button" aria-label="Open User Setting Menu">
          <Avatar className="outline outline-1 outline-gray-300" radius="xl" src={user.iconImage} />
        </button>
      </Popover.Target>
      <Popover.Dropdown>
        <div className="w-full text-center text-xl">
          <span>{user.name}</span>
        </div>
        <Button
          variant="transparent"
          leftSection={<LogOutIcon strokeWidth={3} className="stroke-red-500" size={16} />}
          onClick={() => supabase.auth.signOut()}
          className="mt-2 transition hover:bg-red-400/50"
        >
          <span className="font-bold text-red-500">Sign Out</span>
        </Button>
      </Popover.Dropdown>
    </Popover>
  );
};

export { UserPanel };
