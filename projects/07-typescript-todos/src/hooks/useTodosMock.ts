import { useState } from "react";
import { FilterValue, TodoList } from "../types";
import { mockTodos } from "../mock/mockTodos";
import { TODO_FILTERS } from "../constants/consts";

export const useTodos = (): {
  activeCount: number;
  completedCount: number;
  todos: TodoList;
  filterSelected: FilterValue | undefined;
  handleClearCompleted: () => void;
  handleComplete: (id: string, completed: boolean) => void;
  handleFilterChange: (filter: FilterValue) => void;
  handleRemove: (id: string) => void;
  handleAddTodo: (title: string) => void;
  handleUpdateTitle: (id: string, title: string) => void;
} => {
  const [todos, setTodos] = useState(mockTodos);
  const [filterSelected, setFilterSelected] = useState<FilterValue>();

  const handleComplete = (id: string, completed: boolean): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const handleRemove = (id: string): void => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleUpdateTitle = (id: string, title: string): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const handleAddTodo = (title: string): void => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
  };

  const handleClearCompleted = (): void => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) {
      return !todo.completed;
    }

    if (filterSelected === TODO_FILTERS.COMPLETED) {
      return todo.completed;
    }

    return true;
  });

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter);
    const params = new URLSearchParams(window.location.search);
    params.set("filter", filter);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return {
    activeCount,
    completedCount,
    filterSelected,
    handleClearCompleted,
    handleComplete,
    handleFilterChange,
    handleRemove,
    handleAddTodo,
    handleUpdateTitle,
    todos: filteredTodos,
  };
};
