import { TODO_FILTERS } from "./constants/consts";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export type TodoList = Todo[];

export type FilterValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS];

//Functions
export type ToggleFunction = (id: string, toggle: boolean) => void;
export type IdFunction = (id: string) => void;
export type FilterFunction = (filter: FilterValue) => void;
export type AddTodoFunction = ({ title }: string) => void;
export type SetTitleFunction = (id: string, title: string) => void;
export type SetIsEditingFunction = (completed: string) => void;
