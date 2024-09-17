"use client";

import { NewTodoForm } from "./components/new-todo-form";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";



export default function Home() {
  const todos = useQuery(api.functions.listTodos); 


  return (
    // md - maximum width of div to medium size
    // mx - margin set to auto
    // padding
    <div className="max-w-screen-md mx-auto p4 space-y-4">
      <h1 className="text-xl font-bold"> TodoList</h1>
      <ul className="space-y-2">
        {todos?.map(({ _id, title, description, completed }, index) => (
          <TodoItem
            key={index}
            id={_id}
            title={title}
            description={description}
            completed={completed}

          />
        ))}
      </ul>
      <NewTodoForm/>
    </div>
  );
}

function TodoItem({
  id,
  title,
  description,
  completed,

}: {
  id: Id<"todos">
  title: string;
  description: string;
  completed: boolean;
}) {
  const updateTodo = useMutation(api.functions.updateTodo);
  const removeTodo = useMutation(api.functions.removeTodo);
  return (
    <li className="flex gap-2 items-center border rounded p-2 w-full">
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => updateTodo({id, completed: e.target.checked})}
      />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="ml-auto" >
        <button onClick={() => removeTodo({ id })}>Remove</button>
      </div>
      
    </li>
  );
}
