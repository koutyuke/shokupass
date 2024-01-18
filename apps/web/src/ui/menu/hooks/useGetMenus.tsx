import { Menu, MenuStatusEnum, apiContract } from "@shokupass/api-contracts";
import useSWR from "swr";
import { useUserInfo } from "@/features/signIn/hooks";
import { fetchClient } from "@/utils/fetch";

const useGetMenus = (initialData: Menu[], callback?: (data: Menu[]) => Menu[]) => {
  const { session } = useUserInfo();
  const res = useSWR<Menu[] | null>(
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
    arg =>
      fetchClient.menu.GetMenus(arg).then(r => {
        if (r.status === 200) {
          return callback ? callback(r.body) : r.body;
        }
        return null;
      }),
    { refreshInterval: 1000, fallbackData: initialData },
  );

  return res;
};

export { useGetMenus };
