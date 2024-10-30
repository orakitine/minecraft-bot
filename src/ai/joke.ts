import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";

export const aiJoke = async (): Promise<string[]> => {
  const { text: answer } = await generateText({
    model: anthropic("claude-3-5-sonnet-20240620"),
    system: "You are Skippy, a helpful Minecraft bot.",
    prompt: "Tell a joke",
  });

  // Split the answer into an array by newlines and filter out empty lines
  const lines = answer
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  console.log(`AI JOKE: ${lines.join("\n")}`);
  return lines;
};
