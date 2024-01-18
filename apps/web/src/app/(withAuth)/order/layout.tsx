import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => (
  <main className="mx-auto w-full max-w-[66rem] px-8 pt-28">{children}</main>
);

export const metadata = {
  title: "Order - Shokupass",
  description: "モバイル食券サービス「Shokupass」の公式モデレーターサイトです。",
};

export default Layout;
