import { Menu, apiContract } from "@shokupass/api-contracts";
import { useAtomValue } from "jotai";
import useSWR from "swr";
import { sessionAtom } from "@/store/session";
import { fetchClient } from "@/utils/fetch/fetchClient";

const useGetMenu = (id: string, callback?: (data: Menu) => Menu) => {
  const session = useAtomValue(sessionAtom);
  const res = useSWR<Menu | null>(
    session ? `${apiContract.menu.GetMenu.path}/${id}` : null,
    () =>
      fetchClient.menu
        .GetMenu({
          headers: {
            authorization: `Bearer ${session!.access_token}`,
          },
          params: {
            id,
          },
        })
        .then(r => {
          if (r.status === 200) {
            return callback ? callback(r.body) : r.body;
          }
          return null;
        }),
    { refreshInterval: 3000 },
  );

  return res;
};

export { useGetMenu };
