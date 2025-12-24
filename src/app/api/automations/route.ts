import { NextResponse } from "next/server";
import { loadData, STORE_KEYS, getInitialAutomations } from "@/lib/jsonStore";

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 300));
  const automations = loadData(STORE_KEYS.automations, getInitialAutomations());
  return NextResponse.json(automations);
}

export async function POST(request: Request) {
  const body = await request.json();
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const newAutomation = {
    id: Date.now(),
    ...body,
    runs: 0,
    dmsSent: 0,
    dmsSeen: 0,
    engaged: 0,
    clicks: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  return NextResponse.json(newAutomation, { status: 201 });
}

