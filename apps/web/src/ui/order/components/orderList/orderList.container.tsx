import { OrderStatusEnum } from "@shokupass/api-contracts";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { OrderListPresenter } from "./orderList.presenter";
import { fetchClient } from "@/utils/fetch";
import { createServerSupabaseClient } from "@/utils/supabase/client";

const OrderList = async () => {
  const cookieStore = cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const session = await supabase.auth.getSession();

  if (!session.data.session) {
    redirect("/sign-in");
  }

  const { status: orderStatus, body: orderData } = await fetchClient.order.GetOrders({
    query: {
      status: `${OrderStatusEnum.COOKING}`,
    },
    headers: {
      authorization: `Bearer ${session.data.session.access_token}`,
    },
  });

  const { status: lockerStatus, body: lockerData } = await fetchClient.locker.GetLockers({
    headers: {
      authorization: `Bearer ${session.data.session.access_token}`,
    },
  });

  const orderList = orderStatus === 200 ? orderData : null;
  const lockerList = lockerStatus === 200 ? lockerData : null;

  if (!orderList || !lockerList) {
    return <div>error</div>;
  }

  return (
    <OrderListPresenter
      initialData={{
        orders: orderList,
        lockers: lockerList,
      }}
    />
  );
};

export { OrderList };
