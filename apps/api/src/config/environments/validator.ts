import { plainToClass } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString, validateSync } from "class-validator";

enum NodeEnvEnum {
  Development = "development",
  Production = "production",
  Test = "test",
}

export class EnvValidator {
  @IsEnum(NodeEnvEnum)
  NODE_ENV!: NodeEnvEnum;

  @IsNumber()
  PORT = 3001;

  @IsNotEmpty()
  @IsString()
  SUPABASE_URL!: string;

  @IsNotEmpty()
  @IsString()
  SUPABASE_ANON_KEY!: string;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(EnvValidator, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
