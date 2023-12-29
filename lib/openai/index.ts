import OpenAI from "openai";

const apiKey = process.env.OPENAI_SECRET;

if (!apiKey) throw new Error("apiKey is missing");

const openai = new OpenAI({ apiKey });

export default openai;

export async function getAiResponse(text: string) {
  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: text }],
    model: "gpt-3.5-turbo-1106",
  });

  const answer = response.choices[0].message.content;

  if (!answer) throw new Error("Error getting answer from openai");

  return answer;
}
