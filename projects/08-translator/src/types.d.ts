import { AUTO_LANG, SUPPORTED_LANG } from "./const";

export type Language = keyof typeof SUPPORTED_LANG;
export type AutoLang = typeof AUTO_LANG;
export type FromLang = Language | AutoLang;

export interface State {
  fromLang: FromLang;
  toLang: Language;
  fromText: string;
  result: string;
  loading: boolean;
}

export type Action =
  | { type: "INTERCHANGE_LANG" }
  | { type: "SET_FROM_LANG"; payload: FromLang }
  | { type: "SET_TO_LANG"; payload: Language }
  | { type: "SET_FROM_TEXT"; payload: string }
  | { type: "SET_RESULT"; payload: string };

export enum SectionType {
  From = "from",
  To = "to",
}
