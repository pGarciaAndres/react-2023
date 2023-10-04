import {
  type ToggleFunction,
  type TodoList,
  IdFunction,
  SetTitleFunction,
} from "../types";
import { Todo } from "./Todo";
import { useState } from "react";

interface Props {
  onRemoveTodo: IdFunction;
  onToggleComplete: ToggleFunction;
  setTitle: SetTitleFunction;
  todos: TodoList;
}

export const Todos: React.FC<Props> = ({
  onRemoveTodo,
  onToggleComplete,
  setTitle,
  todos,
}) => {
  const [isEditing, setIsEditing] = useState("");

  return (
    <ul className="todo-list">
      {todos?.map((todo) => (
        <li
          key={todo.id}
          onDoubleClick={() => {
            setIsEditing(todo.id);
          }}
          className={`
            ${todo.completed ? "completed" : ""}
            ${isEditing === todo.id ? "editing" : ""}
          `}
        >
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onToggleComplete={onToggleComplete}
            setTitle={setTitle}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            onRemoveTodo={onRemoveTodo}
          />
        </li>
      ))}
    </ul>
  );
};
