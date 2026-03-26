"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

const url = env("NEXT_PUBLIC_SUPABASE_URL");
const anonKey = env("NEXT_PUBLIC_SUPABASE_ANON_KEY");

export const supabaseBrowser: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

