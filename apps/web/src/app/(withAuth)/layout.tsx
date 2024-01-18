"use client";

import { ReactNode } from "react";
import { useUserInfo } from "@/features/signIn/hooks/useUserInfo";

const WithAuthLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useUserInfo();

  if (user && user.role !== "USER") {
    return children;
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-2">
      <h1 className="text-2xl font-bold">アカウントの権限がありません。</h1>
      <p>アプリ開発者に問い合わせてください。</p>
    </div>
  );
};

export default WithAuthLayout;
