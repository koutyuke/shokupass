import { Order, OrderStatusType, apiContract } from "@shokupass/api-contracts";
import useSWR from "swr";
import { useUserInfo } from "@/features/signIn/hooks";
import { fetchClient } from "@/utils/fetch";

const useGetOrders = (status: OrderStatusType[], initialData: Order[], callback?: (data: Order[]) => Order[]) => {
  const { session } = useUserInfo();
  const res = useSWR(
    session
      ? ({
          key: apiContract.order.GetOrders.path,
          headers: {
            authorization: `Bearer ${session!.access_token}`,
          },
          query: {
            status: status.join(","),
          },
        } satisfies Parameters<typeof fetchClient.order.GetOrders>[0] & { key: string })
      : null,
    arg =>
      fetchClient.order.GetOrders(arg).then(r => {
        if (r.status === 200) {
          return callback ? callback(r.body) : r.body;
        }
        return null;
      }),
    { refreshInterval: 1000, fallbackData: initialData },
  );

  return res;
};

export { useGetOrders };
