import { inngest } from "./inngest-client.js";

export const onOrderPlaced = inngest.createFunction(
  {
    id: "on-order-placed",
    retries: 2,
    triggers: [{ event: "orders.placed" }],
  },
  async ({ event, step }) => {
    const { orderId, customer } = event.data;

    const greeting = await step.run("greet", async () => {
      return `Hello ${customer.name}! Thanks for your oder ${orderId}`;
    });

    await step.run("log-greeting", async () => {
      console.log(greeting);
    });
  },
);
