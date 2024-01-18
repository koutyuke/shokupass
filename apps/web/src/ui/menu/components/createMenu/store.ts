import { apiContract } from "@shokupass/api-contracts";
import { z } from "zod";

export const formScheme = apiContract.menu.CreateMenu.body;

export type FormType = z.infer<typeof formScheme>;
