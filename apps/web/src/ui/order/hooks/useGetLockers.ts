import { apiContract } from "@shokupass/api-contracts";
import useSWR from "swr";
import { useUserInfo } from "@/features/signIn/hooks";
import { fetchClient } from "@/utils/fetch";

const useGetLockers = () => {
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
    arg => fetchClient.locker.GetLockers(arg),
    { refreshInterval: 1000 },
  );

  const data = res.data?.status === 200 ? res.data.body : null;

  return { ...res, data };
};

export { useGetLockers };
