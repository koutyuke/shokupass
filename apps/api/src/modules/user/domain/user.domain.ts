type Role = "ADMIN" | "USER" | "MODERATOR";

type Provider = "GOOGLE" | "DISCORD";

export class User {
  readonly id: string;
  readonly name: string;
  readonly iconImage: string | null;
  readonly role: Role;
  readonly provider: Provider;

  constructor(args: { id: string; name: string; iconImage: string | null; role: Role; provider: Provider }) {
    this.id = args.id;
    this.name = args.name;
    this.iconImage = args.iconImage;
    this.role = args.role;
    this.provider = args.provider;
  }
}
