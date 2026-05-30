export async function calculator({ op, a, b }) {
  if (typeof a !== "number" || typeof b !== "number") {
    return "Both a and b should be numbers.";
  }

  switch (op) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide": 
      if (b === 0) {
        return "Error: Cannot divide by zero.";
      }
      return a / b;

    default:
      return "Error: Invalid operation specified.";
  }
}

export const calculateTool = {
  type: "function",
  function: {
    name: "calculator",
    description: "A simple calculator function that performs basic arithmetic operations like addition, subtraction, multiplication, and division.",
    parameters: {
      type: "object",
      properties: {
        op: { 
          type: "string", 
          enum: ["add", "subtract", "multiply", "divide"],
          description: "The arithmetic operation to execute."
        },
        a: { type: "number", description: "The first number (left operand)." },
        b: { type: "number", description: "The second number (right operand)." },
      },
      required: ["op", "a", "b"],
    },
  },
};