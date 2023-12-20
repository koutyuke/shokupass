import { Reflector } from "@nestjs/core";
import { Role } from "../dto/enum";

export const Roles = Reflector.createDecorator<Role[]>();
