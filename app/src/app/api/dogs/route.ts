import { getDogs } from "@/lib/dogs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dogs = await getDogs();
    return NextResponse.json(dogs);
  } catch (error) {
    console.error("Error fetching dogs:", error);
    return NextResponse.json({ error: "Failed to fetch dogs" }, { status: 500 });
  }
}
