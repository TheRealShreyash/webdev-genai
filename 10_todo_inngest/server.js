import express from "express";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client";
import { createTodo, deleteTodo } from "./store";
import { onTodoCreated } from "./inngest/functions";
import { onTodoDeleted } from "./inngest/functions";

const app = express();
app.use(express.json());
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onTodoCreated, onTodoDeleted],
  }),
);

app.post("/todos", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "title is required" });

  const todo = createTodo(title.trim());
  await inngest.send({
    name: "todo/created",
    data: { todo },
  });
  res.status(201).json(todo);
});

app.delete("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ error: "id is required" });

  const todo = deleteTodo(id);
  console.log(todo);
  if (!todo) return res.status(404).json({ error: "todo not found" });

  await inngest.send({
    name: "todo/deleted",
    data: { todo },
  });
  res.json(todo);
});

app.listen(8080, () => {
  console.log(`Server running on http://localhost:8080`);
});
