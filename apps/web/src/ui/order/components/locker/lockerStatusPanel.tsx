"use client";

import { FC } from "react";
import { useGetLockers } from "../../hooks/useGetLockers";
import { StatusCard } from "./statusCard";

const LockerStatusPanel: FC = () => {
  const { data, isLoading, error } = useGetLockers();

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error || !data) {
    return null;
  }

  data.sort((a, b) => Number(a.id) - Number(b.id));

  return (
    <div className="flex w-full justify-center gap-x-4">
      {data.map(locker => (
        <StatusCard key={locker.id} id={locker.id} orderId={locker.orderId} />
      ))}
    </div>
  );
};

export { LockerStatusPanel };
