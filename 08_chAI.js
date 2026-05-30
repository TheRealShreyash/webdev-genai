import OpenAI from "openai";
import readline from "node:readline";

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY || "lol",
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const sysPrompt = "You are a helpful assistant that responds in 5 lines.";
const conversation = [];

function askQuestion(userPrompt) {
  return new Promise((resolve) => {
    rl.question(userPrompt, (answer) => {
      resolve(answer);
    });
  });
}

while (true) {
  const input = await askQuestion("Ask a question: ");

  if (input.toLowerCase() == "") {
    continue;
  } else if (input.toLowerCase() == "exit") {
    console.log("Bye!");
    process.exit(0);
  }

  const stream = await client.chat.completions.create({
    model: "gemini-2.5-flash",
    stream: true,
    messages: [
      {
        role: "system",
        content: sysPrompt,
      },
      ...conversation,
      { role: "user", content: input },
    ],
  });

  conversation.push(
    { role: "user", content: input },
    { role: "system", content: sysPrompt },
  );

  process.stdout.write("Balti Bot: ");

  let last_chunk = "";
  for await (const message of stream) {
    const delta = message.choices[0]?.delta?.content;
    if (delta) {
      process.stdout.write(delta);
      last_chunk += delta;
    }
  }
}
