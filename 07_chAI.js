import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY || "lol",
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

console.log(client.baseURL);

const stream = await client.chat.completions.create({
  model: "gemini-2.5-flash",
  stream: true,
  messages: [
    {
      role: "system",
      content: "You area a helpful assistant that responds in 5 line.",
    },
    { role: "user", content: "What is latest in AI" },
  ],
});

let last_chunk = "";

console.log("++++++++++ Stream Response: ++++++++++");
for await (const message of stream) {
  const delta = message.choices[0]?.delta?.content;
  if (delta) {
    process.stdout.write(delta);
    last_chunk += delta;
  }
}
