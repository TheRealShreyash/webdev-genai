import express from "express";
import { inngest } from "./inngest-client";
import { serve } from "inngest/express";
import { onOrderPlaced } from "./01-inngest";
import { summarizeThenTranslate } from "./02-inngest-ai";

const app = express();
app.use(express.json());
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onOrderPlaced, summarizeThenTranslate],
  }),
);

app.get("/health", (req, res) => {
  res.json({ message: "Healthy" });
});

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
