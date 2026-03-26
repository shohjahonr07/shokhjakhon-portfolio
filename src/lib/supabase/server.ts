import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

const url =
  env("SUPABASE_URL") ?? env("NEXT_PUBLIC_SUPABASE_URL");

const serviceKey =
  env("SUPABASE_SERVICE_ROLE_KEY") ??
  env("SUPABASE_ANON_KEY") ??
  env("NEXT_PUBLIC_SUPABASE_ANON_KEY");

let supabaseAdmin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  if (!supabaseAdmin) supabaseAdmin = createClient(url, serviceKey);
  return supabaseAdmin;
}

