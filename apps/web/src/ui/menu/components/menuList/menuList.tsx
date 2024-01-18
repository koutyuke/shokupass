"use client";

import { Image } from "#ui/components/web/image";
import { Loader, Table } from "@mantine/core";
import { FC } from "react";
import { useGetMenus } from "../../hooks";
import { DetailedOptionsMenu } from "./detailedOptionsMenu";
import { MenuStatusBadge } from "./statusBadge";

const MenuList: FC = () => {
  const { data, isLoading, error } = useGetMenus();

  if (data === null || error) {
    return <div>error</div>;
  }

  if (isLoading) {
    return (
      <div className="flex w-full justify-start">
        <Loader color="blue" />
      </div>
    );
  }

  const menus = data.sort((a, b) => {
    if (a.status === "AVAILABLE" && b.status === "AVAILABLE") {
      if (a.quantity === 0) {
        return 1;
      }
      if (b.quantity === 0) {
        return -1;
      }
    }
    if (a.status === "AVAILABLE") return -1;
    if (b.status === "AVAILABLE") return 1;

    if (a.status === "PREPARATION") return -1;
    if (b.status === "PREPARATION") return 1;

    return 0;
  });

  return (
    <Table horizontalSpacing="sm" verticalSpacing="lg">
      <Table.Thead>
        <Table.Tr>
          <Table.Th className="text-xl">画像</Table.Th>
          <Table.Th className="text-xl">商品名</Table.Th>
          <Table.Th className="text-xl">説明文</Table.Th>
          <Table.Th className="text-xl">価格</Table.Th>
          <Table.Th className="text-xl">在庫</Table.Th>
          <Table.Th className="text-xl">状態</Table.Th>
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {menus.map(menu => (
          <Table.Tr key={menu.id}>
            <Table.Td width={100}>
              <Image src={menu.image} alt="products image" height={50} width={50} priority />
            </Table.Td>
            <Table.Td className="align-middle" width={150}>
              {menu.name}
            </Table.Td>
            <Table.Td className="truncate align-middle">{menu.description}</Table.Td>
            <Table.Td className="align-middle" width={100}>
              {menu.price}
            </Table.Td>
            <Table.Td className="align-middle" width={100}>
              {menu.quantity}
            </Table.Td>
            <Table.Td className="align-middle" width={110}>
              <MenuStatusBadge status={menu.quantity === 0 && menu.status === "AVAILABLE" ? "SOLD_OUT" : menu.status} />
            </Table.Td>
            <Table.Td className="text-center align-middle" width={64}>
              <DetailedOptionsMenu menu={menu} />
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export { MenuList };
