import { FC } from "react";
import { CreateMenu } from "../components/createMenu";
import { MenuList } from "../components/menuList";

const PageContents: FC = () => (
  <div className="h-fit w-full space-y-4">
    <div className="box-border flex h-12 w-full items-center justify-between border-b border-gray-300 px-2">
      <h1 className="text-4xl">Menu</h1>
      <CreateMenu />
    </div>
    <div className="w-full px-4">
      <MenuList />
    </div>
  </div>
);

export { PageContents };
