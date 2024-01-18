import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ComponentProps, FC } from "react";
import { SetOrderModal } from "./setOrderModal";

type Props = Pick<ComponentProps<typeof SetOrderModal>, "order" | "lockers">;

const SetOrder: FC<Props> = ({ order, lockers }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open}>完了</Button>
      <SetOrderModal
        opened={opened}
        onClose={close}
        order={order}
        lockers={lockers.filter(locker => locker.orderId === null)}
      />
    </>
  );
};

export { SetOrder };
