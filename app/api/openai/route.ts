import { getAiResponse } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  async function streamToString(stream: any) {
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString("utf8");
  }

  const data = await streamToString(req.body);

  const response = await getAiResponse(data);

  return NextResponse.json(response);
}
