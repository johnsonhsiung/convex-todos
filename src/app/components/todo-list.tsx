import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api"; 
import { Id } from "../../../convex/_generated/dataModel";


export function ToDoList() {
    const todos = useQuery(api.functions.listTodos); 
    if (!todos || todos.length == 0) {
      return <div className="flex items-center justify-center"><p>Nothing to do. Add a to-do to get started!</p></div>
    }

  return (
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
  );
}

function TodoItem({
  id,
  title,
  description,
  completed,
}: {
  id: Id<"todos">;
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
        onChange={(e) => updateTodo({ id, completed: e.target.checked })}
      />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="ml-auto">
        <button onClick={() => removeTodo({ id })}>Remove</button>
      </div>
    </li>
  );
}
