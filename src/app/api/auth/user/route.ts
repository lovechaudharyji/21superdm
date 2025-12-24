import { NextResponse } from "next/server";
import { loadData, STORE_KEYS, getInitialCurrentUser } from "@/lib/jsonStore";

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  const currentUser = loadData(STORE_KEYS.currentUser, getInitialCurrentUser());
  return NextResponse.json(currentUser);
}

