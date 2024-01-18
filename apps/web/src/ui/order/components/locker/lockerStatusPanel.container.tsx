import { Order } from "@shokupass/api-contracts";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LockerStatusPanelPresenter } from "./lockerStatusPanel.presenter";
import { fetchClient } from "@/utils/fetch";
import { createServerSupabaseClient } from "@/utils/supabase/client";

const LockerStatusPanel = async () => {
  const cookieStore = cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const session = await supabase.auth.getSession();

  if (!session.data.session) {
    redirect("/sign-in");
  }

  const { status, body } = await fetchClient.locker.GetLockers({
    headers: {
      authorization: `Bearer ${session.data.session.access_token}`,
    },
  });

  const lockerList = status === 200 ? body : null;

  if (!lockerList) {
    return <div>error</div>;
  }

  lockerList.sort((a, b) => Number(a.id) - Number(b.id));

  const lockerListWithOrder: {
    id: string;
    order: Order | null;
  }[] = await Promise.all(
    lockerList.map(async locker => {
      if (!locker.orderId) {
        return {
          id: locker.id,
          order: null,
        };
      }

      const res: {
        id: string;
        order: Order | null;
      } = await fetchClient.order
        .GetOrder({
          headers: {
            authorization: `Bearer ${session.data.session!.access_token}`,
          },
          params: {
            id: locker.orderId,
          },
        })
        .then(r => ({
          id: locker.id,
          order: r.status === 200 ? r.body : null,
        }));
      return res;
    }),
  );
  lockerListWithOrder.sort((a, b) => Number(a.id) - Number(b.id));

  return <LockerStatusPanelPresenter initialData={lockerListWithOrder} />;
};

export { LockerStatusPanel };
