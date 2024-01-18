import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ComponentProps, FC } from "react";
import { useGetLockers } from "../../hooks";
import { SetOrderModal } from "./setOrderModal";

type Props = Pick<ComponentProps<typeof SetOrderModal>, "order">;

const SetOrder: FC<Props> = ({ order }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data, isLoading, error } = useGetLockers();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error || !data) {
    return null;
  }

  const lockers = data.filter(locker => locker.orderId === null);

  return (
    <>
      <Button onClick={open}>完了</Button>
      <SetOrderModal opened={opened} onClose={close} order={order} lockers={lockers} />
    </>
  );
};

export { SetOrder };
