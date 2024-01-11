import { BadRequestException, Controller, NotFoundException, Req, UseGuards } from "@nestjs/common";
import { apiContract } from "@shokupass/api-contracts";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { Role, Provider } from "src/common/dto/enum";
import { AuthGuard, type RequestWithUser } from "src/guard/auth/auth.guard";
import { OrderStatus } from "../order/dto/order.enum";
import { OrderUseCase } from "../order/order.use-case";
import { UserUseCase } from "./user.use-case";

@Controller()
export class UserController {
  constructor(
    private readonly orderUseCase: OrderUseCase,
    private readonly userUseCase: UserUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @TsRestHandler(apiContract.user.GetMyUser)
  async getMyUser(
    @Req()
    request: RequestWithUser,
  ) {
    return tsRestHandler(apiContract.user.GetMyUser, async () => {
      const reqUser = request.user;
      const findUser = await this.userUseCase.find(request.user.id);
      if (findUser) {
        return {
          status: 200,
          body: findUser,
        };
      }

      const provider = reqUser.app_metadata.provider;
      if (provider === "discord") {
        const createUser = await this.userUseCase.create({
          id: request.user.id,
          name: reqUser.user_metadata["custom_claims"].global_name,
          iconImage: reqUser.user_metadata["avatar_url"],
          provider: Provider.DISCORD,
          role: Role.USER,
        });
        return {
          status: 200,
          body: createUser,
        };
      } else if (provider === "google") {
        const createUser = await this.userUseCase.create({
          id: request.user.id,
          name: reqUser.user_metadata["full_name"],
          iconImage: reqUser.user_metadata["avatar_url"],
          provider: Provider.GOOGLE,
          role: Role.USER,
        });
        return {
          status: 200,
          body: createUser,
        };
      }
      throw new BadRequestException();
    });
  }

  @UseGuards(AuthGuard)
  @TsRestHandler(apiContract.user.GetMyOrders)
  async getMyOrders(
    @Req()
    request: RequestWithUser,
  ) {
    return tsRestHandler(apiContract.user.GetMyOrders, async () => {
      const findOrders = await this.orderUseCase.findManyByUserId(request.user.id);
      return {
        status: 200,
        body: findOrders,
      };
    });
  }

  @UseGuards(AuthGuard)
  @TsRestHandler(apiContract.user.GetMyOrder)
  async getMyOrder(
    @Req()
    request: RequestWithUser,
  ) {
    return tsRestHandler(apiContract.user.GetMyOrder, async ({ params }) => {
      const findOrder = await this.orderUseCase.findByUserIdAndId(request.user.id, params.id);
      if (!findOrder) {
        throw new NotFoundException();
      }
      return {
        status: 200,
        body: findOrder,
      };
    });
  }

  @UseGuards(AuthGuard)
  @TsRestHandler(apiContract.user.UpdateMyOrderPayment)
  async updateMyOrderPayment(
    @Req()
    request: RequestWithUser,
  ) {
    return tsRestHandler(apiContract.user.UpdateMyOrderPayment, async ({ params }) => {
      const findOrder = await this.orderUseCase.findByUserIdAndId(request.user.id, params.id);

      if (!findOrder) {
        throw new NotFoundException();
      }

      if (findOrder.isPayment) {
        const updatedPayment = await this.orderUseCase.updatePayment(params.id);
        if (!updatedPayment) {
          throw new BadRequestException();
        }

        if (updatedPayment.isExpired) {
          const updatedOrder = await this.orderUseCase.setNewPayment(findOrder);
          if (!updatedOrder) {
            throw new BadRequestException();
          }
          return {
            status: 200,
            body: updatedOrder.payment,
          };
        }
        if (updatedPayment.isCompleted) {
          const updatedOrder = await this.orderUseCase.update(params.id, {
            status: OrderStatus.COOKING,
          });
          return {
            status: 200,
            body: updatedOrder.payment,
          };
        }
      }

      return {
        status: 200,
        body: findOrder.payment,
      };
    });
  }
}
