"use client";

import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC } from "react";
import { CreateMenuModal } from "./createModal";

const CreateMenu: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button variant="filled" color="rgba(248,113,113, 1)" radius="md" aria-label="create new menu" onClick={open}>
        <span className="h-8 text-lg leading-8">新規作成</span>
      </Button>
      <CreateMenuModal opened={opened} onClose={close} />
    </>
  );
};

export { CreateMenu };
