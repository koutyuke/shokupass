import Icon from "@shokupass/ui/assets/brand/icon.svg";
import { Image } from "@shokupass/ui/components/web/image";
import { Link } from "@shokupass/ui/components/web/link";
import { cookies } from "next/headers";
import { FC } from "react";
import { UserPanel } from "../userPanel";
import { fetchClient } from "@/utils/fetch";
import { createServerSupabaseClient } from "@/utils/supabase/client";

const Header: FC = async () => {
  const cookieStore = cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const session = await supabase.auth.getSession();

  let user = null;

  if (session.data.session) {
    const { status, body } = await fetchClient.user.GetMyUser({
      headers: {
        authorization: `Bearer ${session.data.session.access_token}`,
      },
    });

    user = status === 200 ? body : null;
  }

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
      <UserPanel serverData={user} />
    </header>
  );
};

export { Header };
