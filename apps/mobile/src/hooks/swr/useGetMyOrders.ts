import { Order, apiContract } from "@shokupass/api-contracts";
import { useAtomValue } from "jotai";
import useSWR from "swr";
import { sessionAtom } from "@/store/session";
import { fetchClient } from "@/utils/fetch/fetchClient";

const useGetMyOrders = () => {
  const session = useAtomValue(sessionAtom);
  const res = useSWR<Order[] | null>(
    session ? apiContract.user.GetMyOrders.path : null,
    () =>
      fetchClient.user
        .GetMyOrders({
          headers: {
            authorization: `Bearer ${session!.access_token}`,
          },
        })
        .then(r => {
          if (r.status === 200) {
            return r.body;
          }
          return null;
        }),
    {
      refreshInterval: 1000,
    },
  );

  return res;
};

export { useGetMyOrders };
