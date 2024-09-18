"use client";

import { NewTodoForm } from "../components/new-todo-form";
import { UserButton, SignInButton } from "@clerk/nextjs";
import { ToDoList } from "../components/todo-list";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";

export default function Home() {
  return (
    // md - maximum width of div to medium size
    // mx - margin set to auto
    // padding
    <div className="max-w-screen-md mx-auto p4 space-y-4">
      <Authenticated>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold"> TodoList</h1>
          <UserButton/>
        </div>
        <ToDoList />

        <NewTodoForm />
      </Authenticated>
      <Unauthenticated>
        <p className="text-gray-600">Please sign in to continue</p>
        <SignInButton>
          <button className="p-1 bg-blue-500 text-white rounded">
            Sign In
          </button>
        </SignInButton>
      </Unauthenticated>
      <AuthLoading>
        Loading...
      </AuthLoading>
    </div>
  );
}
