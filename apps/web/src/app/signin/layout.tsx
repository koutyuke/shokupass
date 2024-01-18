import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => (
  <main className="flex h-screen w-screen flex-col items-center justify-center">{children}</main>
);

export const metadata = {
  title: "Sign In - Shokupass",
  description: "モバイル食券サービス「Shokupass」の公式モデレーターサイトです。",
};

export default Layout;
