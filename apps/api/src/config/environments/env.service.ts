import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService) {}

  get NodeEnv(): string {
    return this.configService.get("NODE_ENV")!;
  }

  get Port(): number {
    return this.configService.get("PORT")!;
  }

  get DatabaseUrl(): string {
    return this.configService.get("SUPABASE_URL")!;
  }

  get DatabaseKey(): string {
    return this.configService.get("SUPABASE_ANON_KEY")!;
  }

  get(key: string): string {
    return this.configService.get<string>(key)!;
  }
}
