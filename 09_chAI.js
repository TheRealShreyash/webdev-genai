import OpenAI from "openai";
import { calculator, calculateTool } from "./tools/calculator";

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY || "lol",
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const model = "gemini-2.5-flash";

const sysPrompt = "You are a helpful assistant that responds in 5 lines.";

const tools = [calculateTool];

const messages = [
  {
    role: "system",
    content: sysPrompt,
  },
  {
    role: "user",
    content: "Hey, can you calculate what 4523 minus 1298 is?",
  },
];

const response = await client.chat.completions.create({
  model,
  messages,
  tool_choice: "auto",
  tools,
});

const msg = response.choices[0].message;

console.log(msg);
console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
console.log(msg.tool_calls);

if (msg.tool_calls) {
  for (const tool_call of msg.tool_calls) {
    const toolName = tool_call.name;
    if (toolName === "calculator") {
      // B. Parse the arguments safely
      const args = JSON.parse(tool_call.function.arguments);

      // C. Run your local calculator logic
      const result = await calculator(args);
      console.log(`✅ Computed local result: ${result}`);

      // D. Append the final result to the message log
      messages.push({
        role: "tool",
        tool_call_id: tool_call.id, // Links this answer directly to the model's call ID
        name: toolName,
        content: String(result), // The API expects a string value
      });
    }
  }

  console.log("📡 Sending data back to Gemini...");
  const finalResponse = await client.chat.completions.create({
    model,
    messages,
  });

  console.log("\n++++++++++ Final Answer ++++++++++");
  console.log(finalResponse.choices[0].message.content);
} else {
  console.log(msg.content);
}
