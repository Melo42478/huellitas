import { createClient } from "@supabase/supabase-js";

async function createAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const adminEmail = process.env.ADMIN_EMAIL || "cme.can16@gmail.com";

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const generatedPassword = generatePassword();

  console.log(`Creating admin user: ${adminEmail}`);
  console.log(`Generated password: ${generatedPassword}`);

  const { data, error } = await supabase.auth.admin.createUser({
    email: adminEmail,
    password: generatedPassword,
    email_confirm: true,
  });

  if (error) {
    throw new Error(`Failed to create admin: ${error.message}`);
  }

  console.log("✓ Admin user created successfully");
  console.log("");
  console.log("=".repeat(60));
  console.log("🐾 HUELLITAS ARCOÍRIS — ADMIN CREDENTIALS");
  console.log("=".repeat(60));
  console.log(`Email:    ${adminEmail}`);
  console.log(`Password: ${generatedPassword}`);
  console.log("=".repeat(60));
  console.log("");
  console.log("⚠️  Save these credentials securely. You can change the password");
  console.log("    after logging in for the first time.");
  console.log("");
}

function generatePassword(): string {
  const length = 16;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

createAdmin().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
