import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { getDogs } from "@/lib/dogs";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <AdminLogin />;
  }

  const dogs = await getDogs();
  const { data: movimientos } = await supabase
    .from("movimientos")
    .select("*")
    .order("fecha", { ascending: false });

  return (
    <AdminDashboard
      initialDogs={dogs}
      initialMovimientos={movimientos || []}
    />
  );
}
