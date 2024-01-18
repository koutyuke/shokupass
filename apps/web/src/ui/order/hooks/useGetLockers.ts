import { Locker, apiContract } from "@shokupass/api-contracts";
import useSWR from "swr";
import { useUserInfo } from "@/features/signIn/hooks";
import { fetchClient } from "@/utils/fetch";

const useGetLockers = (initialData: Locker[], callback?: (data: Locker[]) => Locker[]) => {
  const { session } = useUserInfo();
  const res = useSWR(
    session
      ? ({
          key: apiContract.locker.GetLockers.path,
          headers: {
            authorization: `Bearer ${session!.access_token}`,
          },
        } satisfies Parameters<typeof fetchClient.locker.GetLockers>[0] & { key: string })
      : null,
    arg =>
      fetchClient.locker.GetLockers(arg).then(r => {
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
