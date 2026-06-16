import { inngest, gpt4o, geminiai } from "./inngest-client";

export const summarizeThenTranslate = inngest.createFunction(
  {
    id: "summarize-then-translate",
    triggers: [{ event: "summarize.then.translate" }],
  },
  async ({ event, step }) => {
    const summary = await step.ai.infer("summarize", {
      model: geminiai,
      //   body: {
      //     input: [
      //       {
      //         role: "user",
      //         content:
      //           "Summarize the following text in 1 line: " + event.data.text,
      //       },
      //     ],
      //   },

      body: {
        contents: [
          {
            role: "user",
            parts: [
              {
                text:
                  "Summarize the following text in 1 line: " + event.data.text,
              },
            ],
          },
        ],
      },
    });

    const sum = summary.candidates[0].content.parts[0].text;

    const translation = await step.ai.infer("translation", {
      model: geminiai,
      //   body: {
      //     input: [
      //       {
      //         role: "user",
      //         content: "Translate the following text to hindi: " + sum,
      //       },
      //     ],
      //   },
      body: {
        contents: [
          {
            role: "user",
            parts: [{ text: "Translate the following text to hindi: " + sum }],
          },
        ],
      },
    });

    const translationText =
      translation?.output?.[0]?.content?.[0]?.text ||
      translation?.choices?.[0]?.message?.content ||
      translation?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!translationText) {
      throw new Error("Failed to extract translation from gemini response");
    }

    // STEP 3: Logging Output Execution Blocks
    await step.run("log-summary-and-translation", async () => {
      console.log("\n================= WORKFLOW LOGS =================");
      console.log("📝 Summary Line: ", sum);
      console.log("🇮🇳 Hindi Translation: ", translationText);
      console.log("=================================================\n");
    });
  },
);
