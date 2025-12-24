import { NextResponse } from "next/server";
import { loadData, STORE_KEYS, getInitialPlans } from "@/lib/jsonStore";

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 200));
  const plans = loadData(STORE_KEYS.plans, getInitialPlans());
  return NextResponse.json(plans);
}

