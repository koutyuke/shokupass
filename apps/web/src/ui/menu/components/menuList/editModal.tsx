import { Modal } from "@mantine/core";
import { useAtomValue } from "jotai";
import { ComponentProps, FC } from "react";
import { MenuFrom } from "../menuFrom";
import { sessionAtom } from "@/store/session";
import { fetchClient } from "@/utils/fetch";

type Props = Pick<ComponentProps<typeof Modal>, "onClose" | "opened"> &
  Pick<ComponentProps<typeof MenuFrom>, "defaultValues"> & {
    menuId: string;
  };

const EditMenuModal: FC<Props> = ({ onClose, opened, defaultValues, menuId }) => {
  const session = useAtomValue(sessionAtom);
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Edit Menu"
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
          await fetchClient.menu.UpdateMenu({
            body: data,
            headers: {
              authorization: `Bearer ${session!.access_token}`,
            },
            params: {
              id: menuId,
            },
          });
        }}
        defaultValues={defaultValues}
        submitText="更新"
      />
    </Modal>
  );
};

export { EditMenuModal };
