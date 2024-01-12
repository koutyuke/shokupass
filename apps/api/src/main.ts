import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { EnvService } from "@/config/environments/env.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(EnvService).Port;
  await app.listen(port);
}
bootstrap();
