"use client";
import { useState } from "react";

type ToDoItem = {
  title: string;
  description: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<ToDoItem[]>([
    {title: "example", description: "example", completed: false}
  ]);

  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setTodos(prev => {
      const newTodos = [...prev];
      newTodos.push({title, description, completed: false});
      setTitle("");
      setDescription("");
      return newTodos;
    })

  };
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
                  const newTodo = [...prev]
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="title"> Title</label>
        <input type="text" name="title" id="title" value={title} onChange={e => setTitle(e.target.value)} />
        <label htmlFor="description"> Description</label>
        <input type="text" name="description" id="description" value={description} onChange={e => setDescription(e.target.value)}/>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
