export const todos = [];
export const auditLog = [];

let nextId = 1;

export const createTodo = (title) => {
  const todo = { id: nextId++, title, completed: false };

  todos.push(todo);
  return todo;
};

export const getTodo = (id) => {
  return todos.find((todo) => todo.id === id);
};

export const updateTodo = (id, patch) => {
  const todo = getTodo(id);
  if (!todo) return null;
  if (patch.title !== undefined) todo.title = patch.title;
  if (patch.completed !== undefined) todo.completed = patch.completed;

  return todo;
};

export const deleteTodo = (id) => {
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) return null;

  const [deletedTodo] = todos.splice(index, 1);
  return deletedTodo;
};
