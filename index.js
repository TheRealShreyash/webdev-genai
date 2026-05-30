import OpenAI from "openai";

const conversation = [];

async function askQuestion(systemPrompt, userPrompt, history = []) {
  const client = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY || "lol",
    baseURL: "https://generativelanguage.googleapis.com/v1beta/",
  });

  try {
    const response = await client.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    history.push({ role: "user", content: userPrompt });
    history.push({
      role: "assistant",
      content: response.choices[0].message.content,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.log("Error occured", error);
  }
}

const userQuestion = "Hi, My name is Shreyash and tell me a 1 line joke";

const response1 = await askQuestion(
  "You are a friendly funny assistant",
  userQuestion,
  conversation,
);

console.log("++++++ Res 1 ++++++");
console.log(response1);

const userQuestion2 = "What's my name ?";

const response2 = await askQuestion(
  "You are a friendly funny assistant",
  userQuestion2,
  conversation,
);

console.log("++++++ Res 2 ++++++");
console.log(response2);

// const formalPrompt;
