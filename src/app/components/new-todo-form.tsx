"use client";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  Modal,
  Box,
} from "@mui/material";

interface NewTodoFormProps {
  isOpen: boolean; 
  onClose: () => void; 
}

// props (short for "properties") are a mechanism for passing data from a parent component to a child component
export function NewTodoForm({ isOpen, onClose } : NewTodoFormProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState("");
  const createTodo = useMutation(api.functions.createTodo);
  if (!isOpen) return null; 
  


  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: 3,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createTodo({ title, description });
    setTitle("");
    setDescription("");
    onClose(); 
  };
  return (
    <Modal
      open = {true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label id="modal-modal-title"className="text-sm font-semibold" htmlFor="title">
              {" "}
              Title
            </label>
            <input
              className="p-1 border border-gray-300 rounded-md resize-none"
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label id="modal-modal-description" className="text-sm font-semibold" htmlFor="description">
              {" "}
              Description
            </label>
            <textarea
              className="w-full h-32 p-4 border border-gray-300 rounded-md resize-none"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            >
            </textarea>
            <button
              className="bg-blue-500 p-1 rounded text-white"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );

}
