import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User } from "@supabase/supabase-js";
import { Roles } from "src/common/decorator/role.decorator";
import { Role } from "src/common/dto/enum";
import { SupabaseService } from "src/common/supabase/supabase.service";
import { PrismaService } from "src/infra/prisma/prisma.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    readonly supabase: SupabaseService,
    private reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = await this.supabase.SupabaseClient.auth
      .getUser(request.headers["authorization"]?.replace("Bearer ", ""))
      .then(res => res.data.user);

    console.log("user", user);

    if (user === null) {
      return false;
    }
    const roles = this.reflector.get<Role | undefined>(Roles, context.getHandler());
    request.user = user;
    if (!roles) {
      return true;
    }

    const findUser = await this.prismaService.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (roles.includes(findUser?.role ?? "")) {
      return true;
    }
    return false;
  }
}

export type RequestWithUser = Request & { user: User };
