"use client";

import { Order } from "@shokupass/api-contracts";
import { FC } from "react";
import { useGetLockersWithOrder } from "../../hooks/useGetLockersWithOrder";
import { StatusCard } from "./statusCard";

type Props = {
  initialData: {
    id: string;
    order: Order | null;
  }[];
};

const LockerStatusPanelPresenter: FC<Props> = ({ initialData }) => {
  const { data, error } = useGetLockersWithOrder(initialData);

  if (error || !data) {
    return null;
  }

  return (
    <div className="flex w-full justify-center gap-x-4">
      {data.map(locker => (
        <StatusCard key={locker.id} id={locker.id} order={locker.order} />
      ))}
    </div>
  );
};

export { LockerStatusPanelPresenter };
