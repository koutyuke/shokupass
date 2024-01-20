import { Order, apiContract } from "@shokupass/api-contracts";
import { useAtomValue } from "jotai";
import useSWR from "swr";
import { sessionAtom } from "@/store/session";
import { fetchClient } from "@/utils/fetch";

const useGetLockersWithOrder = (initialData: { id: string; order: Order | null }[]) => {
  const session = useAtomValue(sessionAtom);
  const res = useSWR<
    | {
        id: string;
        order: Order | null;
      }[]
    | null
  >(
    session ? `${apiContract.locker.GetLockers.path}withOrder` : null,
    async () => {
      const lockerList = await fetchClient.locker
        .GetLockers({
          headers: {
            authorization: `Bearer ${session!.access_token}`,
          },
        })
        .then(r => (r.status === 200 ? r.body : null));
      if (lockerList === null) return null;

      const lockerListWithOrder = await Promise.all(
        lockerList.map(async locker => {
          if (!locker.orderId) {
            return {
              id: locker.id,
              order: null,
            };
          }

          const re: {
            id: string;
            order: Order | null;
          } = await fetchClient.order
            .GetOrder({
              headers: {
                authorization: `Bearer ${session!.access_token}`,
              },
              params: {
                id: locker.orderId,
              },
            })
            .then(r => ({
              id: locker.id,
              order: r.status === 200 ? r.body : null,
            }));
          return re;
        }),
      );

      return lockerListWithOrder.sort((a, b) => Number(a.id) - Number(b.id));
    },
    { refreshInterval: 1000, fallbackData: initialData },
  );
  return res;
};

export { useGetLockersWithOrder };
