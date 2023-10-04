import { useEffect, useReducer } from "react";
import { FilterValue, TodoList } from "../types";
import { TODO_FILTERS } from "../constants/consts";
import { fetchTodos, updateTodos } from "../services/todosService";

const initialState = {
  sync: false,
  todos: [],
  filterSelected: (() => {
    const params = new URLSearchParams(window.location.search);
    const filter = params.get("filter") as FilterValue | null;
    if (filter === null) return TODO_FILTERS.ALL;
    return Object.values(TODO_FILTERS).includes(filter)
      ? filter
      : TODO_FILTERS.ALL;
  })(),
};

type Action =
  | { type: "INIT_TODOS"; payload: { todos: TodoList } }
  | { type: "CLEAR_COMPLETED" }
  | { type: "COMPLETED"; payload: { id: string; completed: boolean } }
  | { type: "FILTER_CHANGE"; payload: { filter: FilterValue } }
  | { type: "REMOVE"; payload: { id: string } }
  | { type: "ADD_TODO"; payload: { title: string } }
  | { type: "UPDATE_TITLE"; payload: { id: string; title: string } };

interface State {
  sync: boolean;
  todos: TodoList;
  filterSelected: FilterValue;
}

const reducer = (state: State, action: Action): State => {
  if (action.type === "INIT_TODOS") {
    const { todos } = action.payload;
    return {
      ...state,
      sync: false,
      todos,
    };
  }

  if (action.type === "CLEAR_COMPLETED") {
    return {
      ...state,
      sync: true,
      todos: state.todos.filter((todo) => !todo.completed),
    };
  }

  if (action.type === "COMPLETED") {
    const { id, completed } = action.payload;
    return {
      ...state,
      sync: true,
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed,
          };
        }
        return todo;
      }),
    };
  }

  if (action.type === "FILTER_CHANGE") {
    const { filter } = action.payload;
    return {
      ...state,
      sync: true,
      filterSelected: filter,
    };
  }

  if (action.type === "REMOVE") {
    const { id } = action.payload;
    return {
      ...state,
      sync: true,
      todos: state.todos.filter((todo) => todo.id !== id),
    };
  }

  if (action.type === "ADD_TODO") {
    const { title } = action.payload;
    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
    };

    return {
      ...state,
      sync: true,
      todos: [newTodo, ...state.todos],
    };
  }

  if (action.type === "UPDATE_TITLE") {
    const { id, title } = action.payload;
    return {
      ...state,
      sync: true,
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title,
          };
        }
        return todo;
      }),
    };
  }

  return state;
};

export const useTodos = (): {
  activeCount: number;
  completedCount: number;
  todos: TodoList;
  filterSelected: FilterValue;
  handleClearCompleted: () => void;
  handleComplete: (id: string, completed: boolean) => void;
  handleFilterChange: (filter: FilterValue) => void;
  handleRemove: (id: string) => void;
  handleAddTodo: (title: string) => void;
  handleUpdateTitle: (id: string, title: string) => void;
} => {
  const [{ sync, todos, filterSelected }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const handleClearCompleted = (): void => {
    dispatch({ type: "CLEAR_COMPLETED" });
  };

  const handleComplete = (id: string, completed: boolean): void => {
    dispatch({ type: "COMPLETED", payload: { id, completed } });
  };

  const handleFilterChange = (filter: FilterValue): void => {
    dispatch({ type: "FILTER_CHANGE", payload: { filter } });

    const params = new URLSearchParams(window.location.search);
    params.set("filter", filter);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  const handleRemove = (id: string): void => {
    dispatch({ type: "REMOVE", payload: { id } });
  };

  const handleAddTodo = (title: string): void => {
    dispatch({ type: "ADD_TODO", payload: { title } });
  };

  const handleUpdateTitle = (id: string, title: string): void => {
    dispatch({ type: "UPDATE_TITLE", payload: { id, title } });
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  useEffect(() => {
    fetchTodos()
      .then((todos) => {
        dispatch({ type: "INIT_TODOS", payload: { todos } });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (sync) {
      updateTodos({ todos }).catch((err) => {
        console.error(err);
      });
    }
  }, [todos, sync]);

  return {
    filterSelected,
    handleClearCompleted,
    handleComplete,
    handleFilterChange,
    handleRemove,
    handleAddTodo,
    handleUpdateTitle,
    todos: filteredTodos,
    completedCount,
    activeCount,
  };
};
