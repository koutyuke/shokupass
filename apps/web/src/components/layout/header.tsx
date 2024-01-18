"use client";

import Icon from "@shokupass/ui/assets/brand/icon.svg";
import { Image } from "@shokupass/ui/components/web/image";
import { Link } from "@shokupass/ui/components/web/link";
import { FC } from "react";
import { UserMenuPopover } from "../popover/userMenu";
import { useUserInfo } from "@/features/signIn/hooks/useUserInfo";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

const Header: FC = () => {
  const supabase = createBrowserSupabaseClient();
  const { user } = useUserInfo();

  return (
    <header className="fixed top-0 z-[999] flex h-20 w-full items-center justify-between bg-white px-4 shadow-md">
      <nav aria-label="main navigation" className="flex items-center gap-x-8">
        <Link href="/">
          <Image src={Icon} alt="brand icon at shokupass" height={48} priority />
        </Link>

        <Link href="/" className="transition hover:text-black/50">
          <span className="text-lg font-bold ">Top</span>
        </Link>
        <Link href="/menu" className="transition hover:text-black/50">
          <span className="text-lg font-bold ">Menu</span>
        </Link>
        <Link href="/order" className="transition hover:text-black/50">
          <span className="text-lg font-bold">Order</span>
        </Link>
      </nav>
      {user ? (
        <UserMenuPopover user={user} signOut={() => supabase.auth.signOut()} />
      ) : (
        <Link
          href="/sign-in"
          className="flex h-10 place-items-center rounded-lg border border-gray-300 px-6 transition hover:bg-gray-300/10"
        >
          <span className="text-lg font-bold">Sign in</span>
        </Link>
      )}
    </header>
  );
};

export { Header };
