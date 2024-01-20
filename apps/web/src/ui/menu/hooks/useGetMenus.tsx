import { Menu, MenuStatusEnum, apiContract } from "@shokupass/api-contracts";
import { useAtomValue } from "jotai";
import useSWR from "swr";
import { sessionAtom } from "@/store/session";
import { fetchClient } from "@/utils/fetch";

const useGetMenus = (initialData: Menu[], callback?: (data: Menu[]) => Menu[]) => {
  const session = useAtomValue(sessionAtom);
  const res = useSWR<Menu[] | null>(
    session ? apiContract.menu.GetMenus.path : null,
    () =>
      fetchClient.menu
        .GetMenus({
          query: {
            status: `${MenuStatusEnum.AVAILABLE},${MenuStatusEnum.PREPARATION}`,
          },
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

export { useGetMenus };
