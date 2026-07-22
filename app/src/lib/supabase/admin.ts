import { createClient } from "@supabase/supabase-js";

/**
 * Server-only admin client using service role key.
 * NEVER import this in client components or expose to browser.
 * Used only by scripts/seed.ts and future admin server actions.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
