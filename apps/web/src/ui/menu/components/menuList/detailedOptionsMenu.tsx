import { Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Menu as MenuType } from "@shokupass/api-contracts";
import { MoreIcon, EditIcon, DeleteIcon } from "@shokupass/ui/components/web/icon";
import { FC } from "react";
import { DeleteMenuModal } from "./deleteModal";
import { EditMenuModal } from "./editModal";

type Props = {
  menu: MenuType;
};

const DetailedOptionsMenu: FC<Props> = ({ menu }) => {
  const [editOpened, { open: editOpen, close: editClose }] = useDisclosure(false);
  const [deleteOpened, { open: deleteOpen, close: deleteClose }] = useDisclosure(false);
  return (
    <>
      <Menu position="bottom-end" offset={2} withArrow arrowPosition="center">
        <Menu.Target>
          <button
            type="button"
            aria-label="open detail menu"
            className="aspect-square rounded-md p-1 transition hover:bg-gray-200/50"
          >
            <MoreIcon />
          </button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item leftSection={<EditIcon size={16} />} onClick={editOpen}>
            編集
          </Menu.Item>
          <Menu.Item color="red" leftSection={<DeleteIcon size={16} className="stroke-red-400" />} onClick={deleteOpen}>
            削除
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <DeleteMenuModal opened={deleteOpened} onClose={deleteClose} menuId={menu.id} />
      <EditMenuModal opened={editOpened} onClose={editClose} defaultValues={menu} menuId={menu.id} />
    </>
  );
};

export { DetailedOptionsMenu };
