import { useState } from "react";
type TodoFormProps = {
  onCreate: (title: string, description: string) => void;
}
// props (short for "properties") are a mechanism for passing data from a parent component to a child component
export function NewTodoForm( {onCreate} : TodoFormProps ) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(title, description);
    setTitle("");
    setDescription("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title"> Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="description"> Description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
}
