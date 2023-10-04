import { useRef, useState, useEffect } from "react";
import {
  ToggleFunction,
  type Todo as TodoType,
  IdFunction,
  SetTitleFunction,
  SetIsEditingFunction,
} from "../types";

interface Props extends TodoType {
  onToggleComplete: ToggleFunction;
  setTitle: SetTitleFunction;
  isEditing: string;
  setIsEditing: SetIsEditingFunction;
  onRemoveTodo: IdFunction;
}

export const Todo: React.FC<Props> = ({
  id,
  title,
  completed,
  onToggleComplete,
  setTitle,
  isEditing,
  setIsEditing,
  onRemoveTodo,
}) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const inputEditTitle = useRef<HTMLInputElement>(null);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      setEditedTitle(editedTitle.trim());

      if (editedTitle !== title) {
        setTitle(id, editedTitle);
      }

      if (editedTitle === "") onRemoveTodo(id);

      setIsEditing("");
    }

    if (e.key === "Escape") {
      setEditedTitle(title);
      setIsEditing("");
    }
  };

  useEffect(() => {
    inputEditTitle.current?.focus();
  }, [isEditing]);

  return (
    <>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={() => {
            onToggleComplete(id, !completed);
          }}
        />
        <label>{title}</label>
        <button className="destroy" onClick={() => onRemoveTodo(id)} />
      </div>

      <input
        className="edit"
        value={editedTitle}
        onChange={(e) => {
          setEditedTitle(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          setIsEditing("");
        }}
        ref={inputEditTitle}
      />
    </>
  );
};
