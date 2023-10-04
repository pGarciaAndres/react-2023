import { type TodoList } from "../types";

const API_URL = "https://api.jsonbin.io/v3/b/651d616554105e766fbda18f";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  order: number;
}

export const fetchTodos = async (): Promise<Todo[]> => {
  debugger;
  const res = await fetch(API_URL);
  if (!res.ok) {
    console.error("Error fetching Todos");
    return [];
  }

  const { record: todos } = (await res.json()) as { record: Todo[] };
  return todos;
};

export const updateTodos = async ({
  todos,
}: {
  todos: TodoList;
}): Promise<boolean> => {
  const res = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key":
        "$2a$10$ttphFJoN7KQ4SAy7ZROKBeHcr91pbV4rFbxA6tH7h9FpGT7lp3aHe",
    },
    body: JSON.stringify(todos),
  });

  return res.ok;
};
