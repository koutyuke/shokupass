"use client";

import { Image } from "#ui/components/web/image";
import { Loader, Table } from "@mantine/core";
import { MenuStatusEnum, apiContract } from "@shokupass/api-contracts";
import { FC } from "react";
import useSWR from "swr";
import { DetailedOptionsMenu } from "./detailedOptionsMenu";
import { MenuStatusBadge } from "./statusBadge";
import { useUserInfo } from "@/features/signIn/hooks/useUserInfo";
import { fetchClient } from "@/utils/fetch";

const MenuList: FC = () => {
  const { session } = useUserInfo();
  const { data, isLoading } = useSWR(
    session
      ? ({
          key: apiContract.menu.GetMenus.path,
          query: {
            status: `${MenuStatusEnum.AVAILABLE},${MenuStatusEnum.PREPARATION}`,
          },
          headers: {
            authorization: `Bearer ${session!.access_token}`,
          },
        } satisfies Parameters<typeof fetchClient.menu.GetMenus>[0] & { key: string })
      : null,
    arg => fetchClient.menu.GetMenus(arg),
    { refreshInterval: 1000 },
  );

  if (data?.status !== 200) {
    return <div>error</div>;
  }

  if (isLoading) {
    return (
      <div className="flex w-full justify-start">
        <Loader color="blue" />
      </div>
    );
  }

  const menus = data.body.sort((a, b) => {
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
          <Table.Th className="max-w-20 text-xl">説明文</Table.Th>
          <Table.Th className="text-xl">価格</Table.Th>
          <Table.Th className="text-xl">在庫</Table.Th>
          <Table.Th className="text-xl">状態</Table.Th>
          <Table.Th className="" />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {menus.map(menu => (
          <Table.Tr key={menu.id}>
            <Table.Td>
              <Image src={menu.image} alt="products image" height={50} width={50} priority />
            </Table.Td>
            <Table.Td className="w-[8rem] align-middle">{menu.name}</Table.Td>
            <Table.Td className="max-w-[8rem] truncate align-middle">{menu.description}</Table.Td>
            <Table.Td className="max-w-[4rem] align-middle">{menu.price}</Table.Td>
            <Table.Td className="max-w-[4rem] align-middle">{menu.quantity}</Table.Td>
            <Table.Td className="max-w-[4rem] align-middle">
              <MenuStatusBadge status={menu.quantity === 0 && menu.status === "AVAILABLE" ? "SOLD_OUT" : menu.status} />
            </Table.Td>
            <Table.Td className="max-w-[2rem] align-middle">
              <DetailedOptionsMenu menu={menu} />
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export { MenuList };
