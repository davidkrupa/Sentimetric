import { getAiResponse } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const response = await getAiResponse("Hi how are you?");

  return NextResponse.json(response);
}
