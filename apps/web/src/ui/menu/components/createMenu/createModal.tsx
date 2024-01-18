import { Modal } from "@mantine/core";
import { ComponentProps } from "react";
import { MenuFrom } from "../menuFrom";
import { useUserInfo } from "@/features/signIn/hooks/useUserInfo";
import { fetchClient } from "@/utils/fetch";

type Props = Pick<ComponentProps<typeof Modal>, "onClose" | "opened">;

const CreateMenuModal = ({ onClose, opened }: Props) => {
  const { session } = useUserInfo();
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Create New Menu"
      centered
      overlayProps={{
        blur: 3,
      }}
      closeButtonProps={{ "aria-label": "Close modal" }}
      zIndex={1000}
      size="xl"
    >
      <MenuFrom
        onSubmit={async data => {
          onClose();
          await fetchClient.menu.CreateMenu({
            body: data,
            headers: {
              authorization: `Bearer ${session!.access_token}`,
            },
          });
        }}
        defaultValues={{
          quantity: 0,
          status: "PREPARATION",
        }}
        submitText="新規作成"
      />
    </Modal>
  );
};

export { CreateMenuModal };
