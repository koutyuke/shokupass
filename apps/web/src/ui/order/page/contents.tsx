import { FC } from "react";
import { LockerStatusPanel } from "../components/locker";
import { OrderList } from "../components/orderList";

const PageContents: FC = () => (
  <div className="h-fit w-full space-y-4">
    <div className="box-border flex h-12 w-full items-center justify-start border-b border-gray-300 px-2">
      <h1 className="text-4xl">Order</h1>
    </div>
    <div className="w-full">
      <LockerStatusPanel />
    </div>
    <div className="w-full px-4">
      <OrderList />
    </div>
  </div>
);

export { PageContents };
