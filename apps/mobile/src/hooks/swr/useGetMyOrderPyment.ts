import { Payment, apiContract } from "@shokupass/api-contracts";
import { useAtomValue } from "jotai";
import useSWR from "swr";
import { sessionAtom } from "@/store/session";
import { fetchClient } from "@/utils/fetch/fetchClient";

const useGetMyOrderPayment = (id: string, initialData?: Payment) => {
  const session = useAtomValue(sessionAtom);
  const res = useSWR<Payment | null>(
    session ? `${apiContract.user.UpdateMyOrderPayment.path}/${id}payment` : null,
    () =>
      fetchClient.user
        .UpdateMyOrderPayment({
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
    { fallbackData: initialData ?? null },
  );

  return res;
};

export { useGetMyOrderPayment };
