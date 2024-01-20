import { User } from "@shokupass/api-contracts";
import { useAtomValue } from "jotai";
import useSWR from "swr";
import { sessionAtom } from "@/store/session";
import { fetchClient } from "@/utils/fetch";

const useGetMyUser = (initialData?: User | null) => {
  const session = useAtomValue(sessionAtom);

  const res = useSWR<User | null>(
    session ? "GetMyUser" : null,
    () =>
      fetchClient.user
        .GetMyUser({
          headers: {
            authorization: `Bearer ${session!.access_token}`,
          },
        })
        .then(r => (r.status === 200 ? r.body : null)),
    {
      fallbackData: initialData ?? null,
    },
  );

  return res;
};

export { useGetMyUser };
