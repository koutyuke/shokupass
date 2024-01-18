import { MenuStatusEnum, apiContract } from "@shokupass/api-contracts";
import useSWR from "swr";
import { useUserInfo } from "@/features/signIn/hooks";
import { fetchClient } from "@/utils/fetch";

const useGetMenus = () => {
  const { session } = useUserInfo();
  const res = useSWR(
    session
      ? ({
          key: apiContract.menu.GetMenus.path,
          query: {
            status: `${MenuStatusEnum.AVAILABLE},${MenuStatusEnum.PREPARATION}`,
          },
          headers: {
            authorization: `Bearer ${session!.access_token}`,
          },
        } satisfies Parameters<typeof fetchClient.menu.GetMenus>[0] & { key: string })
      : null,
    arg => fetchClient.menu.GetMenus(arg),
    { refreshInterval: 1000 },
  );

  const data = res.data?.status === 200 ? res.data.body : null;

  return { ...res, data };
};

export { useGetMenus };
