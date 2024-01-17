import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { twMerge } from "@shokupass/tailwind-config/utils";
import { mPlusRounded1c } from "@shokupass/ui/font/nextjs";
import { ReactNode } from "react";
import "../styles/globals.css";
import { Header } from "@/components/layout";
import "destyle.css";

export const metadata = {
  title: "Shokupass - おいしいを、お届け。",
  description: "モバイル食券サービス「Shokupass」の公式モデレーターサイトです。",
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="ja">
    <head>
      <ColorSchemeScript />
    </head>
    <body className={twMerge(mPlusRounded1c.variable, "h-1 min-h-full w-1 min-w-full bg-white font-mPlusRounded1c")}>
      <MantineProvider>
        <Header />
        {children}
      </MantineProvider>
    </body>
  </html>
);

export default RootLayout;
