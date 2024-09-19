import { useAction } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";

export function GenerateTodosForm() {

  const [prompt, setPrompt] = useState("");

  const generateTodo = useAction(api.actions.generateTodos)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const todos = await generateTodo({prompt})
        console.log(todos)
    } catch (error) {
        console.log("Error", error)
    }
    
    setPrompt("");

  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">Generate tasks with AI</h2>
        <label className="text-sm font-semibold" htmlFor="prompt" > Title</label>
        <input
          className="p1 border rounded"
          type="text"
          name="prompt"
          id="prompt"
          value={[prompt]}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="bg-blue-500 p-1 rounded text-white" type="submit">Generate</button>
      </div>
    </form>
  );
}