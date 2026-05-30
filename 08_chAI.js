import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY || "lol",
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});
