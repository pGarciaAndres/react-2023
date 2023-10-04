import { AddTodoFunction } from "../types";
import { useState } from "react";

interface Props {
  saveTodo: AddTodoFunction;
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    saveTodo(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        placeholder="What to do?"
        autoFocus
      />
    </form>
  );
};
