import { apiContract } from "@shokupass/api-contracts";
import useSWR from "swr";
import { useUserInfo } from "@/features/signIn/hooks";
import { fetchClient } from "@/utils/fetch";

const useGetOrder = (id: string | null) => {
  const { session } = useUserInfo();
  const res = useSWR(
    session && id
      ? ({
          key: apiContract.order.GetOrder.path,
          headers: {
            authorization: `Bearer ${session!.access_token}`,
          },
          params: {
            id,
          },
        } satisfies Parameters<typeof fetchClient.order.GetOrder>[0] & { key: string })
      : null,
    arg => fetchClient.order.GetOrder(arg),
    { refreshInterval: 1000 },
  );
  const data = res.data?.status === 200 ? res.data.body : null;

  return { ...res, data };
};

export { useGetOrder };
