import { NextResponse } from "next/server";
import { mockUser } from "@/lib/mock-data";

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return NextResponse.json(mockUser);
}

