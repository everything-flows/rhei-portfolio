import { createClient } from "@/utils/supabase-server";
import GNBClientWrapper from "./index.client";

export default async function GNBWrapper() {
  try {
    const supabase = await createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    return <GNBClientWrapper isLoggedIn={!!session?.user} />;
  } catch {
    return <GNBClientWrapper />;
  }
}
