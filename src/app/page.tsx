"use client";
import { useState } from "react";
import { NewTodoForm } from "./components/new-todo-form";

type ToDoItem = {
  title: string;
  description: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<ToDoItem[]>([
    { title: "example", description: "example", completed: false },
  ]);

  return (
    // md - maximum width of div to medium size
    // mx - margin set to auto
    // padding
    <div className="max-w-screen-md mx-auto p4">
      <h1 className="text-xl font-bold"> TodoList</h1>
      <ul>
        {todos.map(({ title, description, completed }, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) =>
                setTodos((prev) => {
                  // prev (can be named anything) is the current state of todos before the update
                  const newTodo = [...prev];
                  newTodo[index].completed = e.target.checked;
                  return newTodo;
                })
              }
            />
            <span className="font-semibold">{title}</span>
            {description}
          </li>
        ))}
      </ul>
      <NewTodoForm
        onCreate={(title, description) => {
          setTodos((prev) => {
            const newTodos = [...prev];
            newTodos.push({ title, description, completed: false });
            return newTodos;
          });
        }}
      ></NewTodoForm>
    </div>
  );
}
