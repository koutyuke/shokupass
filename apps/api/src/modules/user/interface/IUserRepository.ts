import { User } from "../domain/user.domain";

export interface IUserRepository {
  find(userId: User["id"]): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(userId: User["id"]): Promise<User>;
}
