"use client";
import { NewTodoForm } from "../components/new-todo-form";
import { ToDoList } from "../components/todo-list";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { GenerateTodosForm } from "../components/generate-todos-form";
import { useState } from "react";


export default function Home() {
  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const [openGenerate, setOpenGenerate] = useState(false);
  const handleOpenGenerate = () => setOpenGenerate(true);
  const handleCloseGenerate = () => setOpenGenerate(false);
  

  return (
    // md - maximum width of div to medium size
    // mx - margin set to auto
    // padding
    <div className="max-w-screen-md mx-auto max-h-screen-md">
      <div className="max-w-screen-md mx-auto p-4 space-y-4 overflow-y-auto max-h-[80vh] relative">
        <Authenticated>
          
          <ToDoList/>
          <NewTodoForm isOpen={openCreate} onClose={handleCloseCreate} />
          <GenerateTodosForm isOpen={openGenerate} onClose={handleCloseGenerate}/>
        </Authenticated>
        <Unauthenticated>
          <p className="text-gray-600">Please sign in to continue</p>
        </Unauthenticated>
        <AuthLoading>Loading...</AuthLoading>
      </div>
      <button className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleOpenCreate}>
        Add Todo
      </button>
      <button className="absolute bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleOpenGenerate}>
        Generate Todo
      </button>
    </div>
  );
}
