import { OrderStatusType, apiContract } from "@shokupass/api-contracts";
import useSWR from "swr";
import { useUserInfo } from "@/features/signIn/hooks";
import { fetchClient } from "@/utils/fetch";

const useGetOrders = (status: OrderStatusType[]) => {
  const { session } = useUserInfo();
  const res = useSWR(
    session
      ? ({
          key: apiContract.order.GetOrders.path,
          headers: {
            authorization: `Bearer ${session!.access_token}`,
          },
          query: {
            status: status.join(","),
          },
        } satisfies Parameters<typeof fetchClient.order.GetOrders>[0] & { key: string })
      : null,
    arg => fetchClient.order.GetOrders(arg),
    { refreshInterval: 1000 },
  );

  const data = res.data?.status === 200 ? res.data.body : null;

  return { ...res, data };
};

export { useGetOrders };
