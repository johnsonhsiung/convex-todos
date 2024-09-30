import { useAction } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Modal, Box } from "@mui/material";

interface GenerateTodosFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GenerateTodosForm({ isOpen, onClose }: GenerateTodosFormProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const generateTodo = useAction(api.actions.generateTodos);
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
    try {
      setLoading(true);
      await generateTodo({ prompt });
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
      onClose()
    }

    setPrompt("");
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <div className="flex justify-center">
              <h2 className="font-semibold text-lg ">Generate tasks with AI</h2>{" "}
            </div>
            <label className="text-sm font-semibold" htmlFor="prompt">
              Prompt
            </label>
            <input
              className="p-1 border rounded"
              type="text"
              name="prompt"
              id="prompt"
              value={[prompt]}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              className="bg-blue-500 p-1 rounded text-white"
              type="submit"
            >
              Generate
            </button>
          </div>
        </form>
        { loading && <p>Generating...</p>}
       
      </Box>
    </Modal>
  );
}
