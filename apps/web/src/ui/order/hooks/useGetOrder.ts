import { apiContract } from "@shokupass/api-contracts";
import { useAtomValue } from "jotai";
import useSWR from "swr";
import { sessionAtom } from "@/store/session";
import { fetchClient } from "@/utils/fetch";

const useGetOrder = (id: string | null) => {
  const session = useAtomValue(sessionAtom);
  const res = useSWR(
    session && id ? apiContract.order.GetOrder.path : null,
    () =>
      fetchClient.order.GetOrder({
        headers: {
          authorization: `Bearer ${session!.access_token}`,
        },
        params: {
          id: id!,
        },
      }),
    { refreshInterval: 1000 },
  );
  const data = res.data?.status === 200 ? res.data.body : null;

  return { ...res, data };
};

export { useGetOrder };
