import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GITHUB_API_KEY || "github_pat_YOUR_TOKEN_HERE",
  baseURL: "https://models.github.ai/inference",
});

async function runGitHubModel() {
  try {
    const stream = await client.chat.completions.create({
      model: "openai/gpt-4o",
      stream: true,
      messages: [
        {
          role: "user",
          content:
            "Explain the difference between a REST API and WebSockets in one punchy line.",
        },
      ],
    });

    console.log("Streaming response from GitHub Models:\n");
    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content;
      if (delta) {
        process.stdout.write(delta);
      }
    }
    console.log("\n");
  } catch (error) {
    console.error("An error occurred with GitHub Models:", error);
  }
}

await runGitHubModel();
