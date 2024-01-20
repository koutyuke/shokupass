import { Order, OrderStatusType, apiContract } from "@shokupass/api-contracts";
import { useAtomValue } from "jotai";
import useSWR from "swr";
import { sessionAtom } from "@/store/session";
import { fetchClient } from "@/utils/fetch";

const useGetOrders = (status: OrderStatusType[], initialData: Order[], callback?: (data: Order[]) => Order[]) => {
  const session = useAtomValue(sessionAtom);
  const res = useSWR(
    session ? apiContract.order.GetOrders.path : null,
    () =>
      fetchClient.order
        .GetOrders({
          headers: {
            authorization: `Bearer ${session!.access_token}`,
          },
          query: {
            status: status.join(","),
          },
        })
        .then(r => {
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
