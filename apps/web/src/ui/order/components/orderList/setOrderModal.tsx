import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, NativeSelect, Table } from "@mantine/core";
import { Locker, Order } from "@shokupass/api-contracts";
import { useAtomValue } from "jotai";
import { ComponentProps, FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sessionAtom } from "@/store/session";
import { fetchClient } from "@/utils/fetch";

type Props = Pick<ComponentProps<typeof Modal>, "onClose" | "opened"> & {
  order: Order;
  lockers: Locker[];
};

const SetOrderModal: FC<Props> = ({ onClose, opened, order, lockers }) => {
  const session = useAtomValue(sessionAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    lockerId: string;
  }>({
    reValidateMode: "onChange",
    resolver: zodResolver(
      z.object({
        lockerId: z.string().min(1, "ロッカーを選択してください"),
      }),
    ),
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Set Order to Locker"
      centered
      overlayProps={{
        blur: 3,
      }}
      closeButtonProps={{ "aria-label": "Close modal" }}
      zIndex={1000}
      size="md"
    >
      <div className="w-full space-y-4">
        <p className="w-full text-center">以下の注文をロッカーにセットしまか？</p>

        <form
          onSubmit={handleSubmit(async data => {
            await fetchClient.order.UpdateOrderLocker({
              body: {
                lockerId: data.lockerId,
              },
              params: {
                id: order.id,
              },
              headers: {
                authorization: `Bearer ${session!.access_token}`,
              },
            });

            onClose();
          })}
          className="flex w-full flex-col items-center gap-y-4"
        >
          <NativeSelect
            label="セットするロッカー"
            {...register("lockerId")}
            data={lockers.map(locker => locker.id)}
            error={errors.lockerId?.message}
          />
          <div className="max-h-40 w-4/5 overflow-auto">
            <Table horizontalSpacing="sm" striped withTableBorder withColumnBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>メニュー</Table.Th>
                  <Table.Th>個数</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {order.items.map(item => (
                  <Table.Tr key={item.menu.id}>
                    <Table.Td>{item.menu.name}</Table.Td>
                    <Table.Td width={64}>{item.quantity}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
          <Button type="submit">セットする</Button>
        </form>
      </div>
    </Modal>
  );
};

export { SetOrderModal };
