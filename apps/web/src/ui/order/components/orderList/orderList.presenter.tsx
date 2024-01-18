"use client";

import { Table } from "@mantine/core";
import { Locker, Order, OrderStatusEnum } from "@shokupass/api-contracts";
import { FC } from "react";
import { useGetLockers } from "../../hooks";
import { useGetOrders } from "../../hooks/useGetOrders";
import { SetOrder } from "./setOrder";

type Props = {
  initialData: {
    lockers: Locker[];
    orders: Order[];
  };
};

const OrderListPresenter: FC<Props> = ({ initialData }) => {
  const { data: cookingOrders, error: cookingOrdersError } = useGetOrders(
    [OrderStatusEnum.COOKING],
    initialData.orders,
    value => value.sort((a, b) => (a.updatedAt > b.updatedAt ? 1 : -1)),
  );

  const { data: lockers, error: lockersError } = useGetLockers(initialData.lockers, value =>
    value.sort((a, b) => (Number(a.id) > Number(b.id) ? 1 : -1)),
  );

  if (cookingOrdersError || !cookingOrders || lockersError || !lockers) {
    return null;
  }

  return (
    <Table horizontalSpacing="sm" verticalSpacing="lg">
      <Table.Thead>
        <Table.Tr>
          <Table.Th className="text-xl">ID</Table.Th>
          <Table.Th className="text-xl">User ID</Table.Th>
          <Table.Th className="text-xl">注文内容</Table.Th>
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {cookingOrders.map(order => (
          <Table.Tr key={order.id}>
            <Table.Td width="20%">{order.id}</Table.Td>
            <Table.Td width="20%">{order.userId}</Table.Td>
            <Table.Td>
              <ul>
                {order.items.map(item => (
                  <li key={item.menu.id}>
                    {item.menu.name} * {item.quantity}
                  </li>
                ))}
              </ul>
            </Table.Td>
            <Table.Td width="100">
              <SetOrder order={order} lockers={lockers} />
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export { OrderListPresenter };
