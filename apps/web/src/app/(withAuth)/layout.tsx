/* eslint-disable react/jsx-no-useless-fragment */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { fetchClient } from "@/utils/fetch";
import { createServerSupabaseClient } from "@/utils/supabase/client";

const WithAuthLayout = async ({ children }: { children: ReactNode }) => {
  const cookieStore = cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const session = await supabase.auth.getSession();

  if (!session.data.session) {
    redirect("/sign-in");
  }

  const { status, body } = await fetchClient.user.GetMyUser({
    headers: {
      authorization: `Bearer ${session.data.session.access_token}`,
    },
  });

  const user = status === 200 ? body : null;

  if (user && user.role !== "USER") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-2">
      <h1 className="text-2xl font-bold">アカウントの権限がありません。</h1>
      <p>アプリ開発者に問い合わせてください。</p>
    </div>
  );
};

export default WithAuthLayout;
