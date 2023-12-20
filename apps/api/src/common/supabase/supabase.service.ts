import { Injectable } from "@nestjs/common";
import { createClient } from "@supabase/supabase-js";
import { EnvService } from "src/config/environments/env.service";

@Injectable()
export class SupabaseService {
  constructor(private readonly config: EnvService) {}

  get SupabaseClient() {
    const supabaseUrl = this.config.DatabaseUrl;
    const supabaseKey = this.config.DatabaseKey;

    const supabase = createClient(supabaseUrl, supabaseKey);

    return supabase;
  }
}
