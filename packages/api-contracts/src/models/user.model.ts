import { z } from "zod";

export type RoleType = "ADMIN" | "USER" | "MODERATOR";

export type ProviderType = "GOOGLE" | "DISCORD";

export enum RoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
}

export enum ProviderEnum {
  GOOGLE = "GOOGLE",
  DISCORD = "DISCORD",
}

export const roleModel = z.enum(["USER", "ADMIN", "MODERATOR"]);

export const providerModel = z.enum(["GOOGLE", "DISCORD"]);

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  iconImage: z.string().nullable(),
  role: roleModel,
  provider: providerModel,
});

export type User = z.infer<typeof userSchema>;
