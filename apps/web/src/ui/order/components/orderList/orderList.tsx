"use client";

import { Table } from "@mantine/core";
import { OrderStatusEnum } from "@shokupass/api-contracts";
import { FC } from "react";
import { useGetOrders } from "../../hooks/useGetOrders";
import { SetOrder } from "./setOrder";

const OrderList: FC = () => {
  const {
    data: cookingOrders,
    isLoading: cookingOrdersIsLoading,
    error: cookingOrdersError,
  } = useGetOrders([OrderStatusEnum.COOKING]);

  if (cookingOrdersIsLoading) {
    return <div>loading...</div>;
  }

  if (cookingOrdersError || !cookingOrders) {
    return null;
  }

  cookingOrders.sort((a, b) => (a.updatedAt > b.updatedAt ? 1 : -1));

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
              <SetOrder order={order} />
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export { OrderList };
