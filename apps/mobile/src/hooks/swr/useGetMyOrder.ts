import { Order, apiContract } from "@shokupass/api-contracts";
import { useAtomValue } from "jotai";
import useSWR from "swr";
import { sessionAtom } from "@/store/session";
import { fetchClient } from "@/utils/fetch/fetchClient";

const useGetMyOrder = (id: string) => {
  const session = useAtomValue(sessionAtom);
  const res = useSWR<Order | null>(session ? `${apiContract.user.GetMyOrder.path}/${id}` : null, () =>
    fetchClient.user
      .GetMyOrder({
        headers: {
          authorization: `Bearer ${session!.access_token}`,
        },
        params: {
          id,
        },
      })
      .then(r => {
        if (r.status === 200) {
          return r.body;
        }
        return null;
      }),
  );

  return res;
};

export { useGetMyOrder };
