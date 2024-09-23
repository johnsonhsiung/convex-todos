import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";
import { internal } from "./_generated/api"
import { requireUser } from "./helper";

const openai = new OpenAI({ 
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

export const generateTodos = action({

  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await requireUser(ctx); 
    const response = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Generate a list of 3 to-dos for the given prompt. Each item must have a title and description. The list of todos must be in the following JSON object format: { todos: [{ title: string, description: string}]}",
        },
        { role: "user", content: `Prompt: ${args.prompt}` },
      ],
      response_format: {type: 'json_object'}
    });
    const content = JSON.parse(response.choices[0].message.content!) as {
        todos : {title: string, description: string}[]
    }
    await ctx.runMutation(internal.functions.createManyTodo, { 
        todos: content.todos,
        userID: user.tokenIdentifier
    });


    return content.todos; 
  },
});
