import { Button, Modal } from "@mantine/core";
import { useAtomValue } from "jotai";
import { ComponentProps, FC } from "react";
import { sessionAtom } from "@/store/session";
import { fetchClient } from "@/utils/fetch";

type Props = Pick<ComponentProps<typeof Modal>, "onClose" | "opened"> & {
  menuId: string;
};

const DeleteMenuModal: FC<Props> = ({ menuId, onClose, opened }) => {
  const session = useAtomValue(sessionAtom);
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Delete Menu"
      centered
      overlayProps={{
        blur: 3,
      }}
      closeButtonProps={{ "aria-label": "Close modal" }}
      zIndex={1000}
      size="md"
    >
      <div className="flex h-48 w-full flex-col gap-y-4">
        <div className=" flex w-full grow flex-col items-center justify-center">
          <p className="text-center text-2xl font-bold">本当に削除しますか？</p>
          <p className="text-center text-xl font-bold">削除すると元に戻せません。</p>
        </div>
        <div className="flex justify-between">
          <Button color="gray" onClick={onClose}>
            キャンセル
          </Button>
          <Button
            color="red"
            onClick={async () => {
              await fetchClient.menu.DeleteMenu({
                headers: {
                  authorization: `Bearer ${session!.access_token}`,
                },
                params: {
                  id: menuId,
                },
              });
              onClose();
            }}
          >
            削除する
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export { DeleteMenuModal };
