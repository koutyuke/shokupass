import { MenuStatusEnum } from "@shokupass/api-contracts";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MenuListPresenter } from ".";
import { fetchClient } from "@/utils/fetch";
import { createServerSupabaseClient } from "@/utils/supabase/client";

const MenuList = async () => {
  const cookieStore = cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const session = await supabase.auth.getSession();

  if (!session.data.session) {
    redirect("/sign-in");
  }

  const { status, body } = await fetchClient.menu.GetMenus({
    query: {
      status: `${MenuStatusEnum.AVAILABLE},${MenuStatusEnum.PREPARATION}`,
    },
    headers: {
      authorization: `Bearer ${session.data.session.access_token}`,
    },
  });

  const menuList = status === 200 ? body : null;

  if (!menuList) {
    return <div>error</div>;
  }

  return (
    <MenuListPresenter
      initialData={menuList.sort((a, b) => {
        if (a.status === "AVAILABLE" && b.status === "AVAILABLE") {
          if (a.quantity === 0 && b.quantity === 0) {
            return a.updatedAt > b.updatedAt ? -1 : 1;
          }
          if (a.quantity === 0) {
            return 1;
          }
          if (b.quantity === 0) {
            return -1;
          }
        }

        if (a.status === "PREPARATION" && b.status === "PREPARATION") {
          return a.updatedAt > b.updatedAt ? -1 : 1;
        }

        if (a.status === "AVAILABLE") return -1;
        if (b.status === "AVAILABLE") return 1;

        if (a.status === "PREPARATION") return -1;
        if (b.status === "PREPARATION") return 1;

        return 0;
      })}
    />
  );
};

export { MenuList };
