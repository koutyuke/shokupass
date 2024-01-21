import { atom } from "jotai";

const CartAtom = atom<
  {
    menuId: string;
    quantity: number;
  }[]
>([]);

export { CartAtom };
