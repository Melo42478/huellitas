import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Server-side validation
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email es requerido" },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Contraseña es requerida" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    // Validate email length (RFC 5321)
    if (email.length > 254) {
      return NextResponse.json(
        { error: "Email muy largo" },
        { status: 400 }
      );
    }

    // Validate password minimum length
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      );
    }

    // Authenticate with Supabase
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: "Email o contraseña inválidos" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: true, user: data.user },
      { status: 200 }
    );
  } catch (err) {
    console.error("Auth error:", err);
    return NextResponse.json(
      { error: "Error al autenticar" },
      { status: 500 }
    );
  }
}
