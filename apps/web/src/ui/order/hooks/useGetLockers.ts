import { Locker, apiContract } from "@shokupass/api-contracts";
import { useAtomValue } from "jotai";
import useSWR from "swr";
import { sessionAtom } from "@/store/session";
import { fetchClient } from "@/utils/fetch";

const useGetLockers = (initialData: Locker[], callback?: (data: Locker[]) => Locker[]) => {
  const session = useAtomValue(sessionAtom);
  const res = useSWR(
    session ? apiContract.locker.GetLockers.path : null,
    () =>
      fetchClient.locker
        .GetLockers({
          headers: {
            authorization: `Bearer ${session!.access_token}`,
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

export { useGetLockers };
