"use client";
import { useState } from "react";

type ToDoItem = {
  title: string;
  description: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<ToDoItem[]>([]);
  return (
    // md - maximum width of div to medium size
    // mx - margin set to auto
    // padding
    <div className="max-w-screen-md mx-auto p4">
      <h1 className="text-xl font-bold"> TodoList</h1>
      <ul>
        {todos.map(({ title, description, completed }, index) => (
          <li key={index}>
      
            <input type="checkbox" checked={completed} onChange={e => setTodos(prev => { // prev (can be named anything) is the current state of todos before the update 
              prev[index].completed = e.target.checked;
              return prev;
            })} />
            <span className="font-semibold">{title}</span>
            {description}
          </li>
        ))}
      </ul>
    </div>
  );
}
