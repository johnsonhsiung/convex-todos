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
    <div className="max-w-screen-md mx-auto p4 space-y-4">
      <h1 className="text-xl font-bold"> TodoList</h1>
      <ul className="space-y-2">
        {todos.map(({ title, description, completed }, index) => (
          <TodoItem
            key={index}
            title={title}
            description={description}
            completed={completed}
            onCompleteChange={(newValue) => {
              setTodos((prev) => {
                // prev (can be named anything) is the current state of todos before the update
                const newTodo = [...prev];
                newTodo[index].completed = newValue;
                return newTodo;
              });
            }}
            onRemove={ () => {
              setTodos((prev) => {
                // prev (can be named anything) is the current state of todos before the update
                const newTodo = [...prev].filter((_, i) => i !== index)
                return newTodo;
              });

            }

            }
          />
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

function TodoItem({
  title,
  description,
  completed,
  onCompleteChange,
  onRemove
}: {
  title: string;
  description: string;
  completed: boolean;
  onCompleteChange: (newValue: boolean) => void;
  onRemove: () => void; 
}) {
  return (
    <li className="flex gap-2 items-center border rounded p-2 w-full">
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => onCompleteChange(e.target.checked)}
      />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="ml-auto" >
        <button onClick={() => onRemove() }>Remove</button>
      </div>
      
    </li>
  );
}
