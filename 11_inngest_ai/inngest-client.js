import { Inngest } from "inngest";
import { openaiResponses, gemini } from "@inngest/ai/models";

export const inngest = new Inngest({
  id: "inngest-ai",
});

export const gpt4o = openaiResponses({
  model: "gpt-4o",
  apiKey: process.env.GITHUB_API_KEY,

  baseUrl: "https://models.inference.ai.azure.com",
});

// export const gemini = openaiResponses({
//   model: "gemini-2.5-flash",
//   apiKey: process.env.GEMINI_API_KEY,
//   baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai/",
// });

export const geminiai = gemini({
  model: "gemini-2.5-flash",
  apiKey: "AIzaSyBsmjknz_uzBfCOZjDJFRE8TXgzG97bX0o",
});
