import { Group, HoverCard } from "@mantine/core";
import { twMerge } from "@shokupass/tailwind-config/utils";
import { FC } from "react";
import { useGetOrder } from "../../hooks";

type Props = {
  id: string;
  orderId: string | null;
};

const StatusCard: FC<Props> = ({ orderId, id }) => {
  const { data, error } = useGetOrder(orderId);

  if (error) {
    return <p className="text-center">エラー</p>;
  }

  return (
    <Group justify="center">
      <HoverCard withArrow arrowPosition="center" width={320}>
        <HoverCard.Target>
          <button
            type="button"
            aria-label="open locker status"
            className={twMerge(
              "flex h-24 w-24 flex-col items-center justify-center overflow-hidden rounded-lg border-2 ",
              orderId ? "border-green-400" : "border-gray-300",
            )}
          >
            <span className="h-6">{id}</span>
            <span className="h-6">{orderId ? "使用中" : "空き"}</span>
          </button>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          {data ? (
            <div className="grid w-full grid-cols-[3rem,_1fr] grid-rows-[1.5rem,_1fr] gap-2">
              <span className="w-full text-center">ID</span>
              <span className="w-full truncate">{data.id}</span>
              <span className="w-full text-center">注文</span>
              <ul className="h-fit w-full list-disc">
                {data.items.map(item => (
                  <li key={item.menu.id} className="truncate">
                    {item.menu.name} * {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-center">未使用</p>
          )}
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
};

export { StatusCard };
