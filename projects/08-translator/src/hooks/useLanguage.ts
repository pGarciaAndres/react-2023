import { AUTO_LANG } from "../const";
import { Action, FromLang, Language, State } from "../types.d";
import { useReducer } from "react";

const initialState: State = {
  fromLang: "auto",
  toLang: "en",
  fromText: "",
  result: "",
  loading: false,
};

function reducer(state: State, action: Action) {
  const { type } = action;

  if (type === "INTERCHANGE_LANG") {
    if (state.fromLang === AUTO_LANG) return state;

    const loading = state.fromText !== "";

    return {
      ...state,
      loading,
      result: "",
      fromLang: state.toLang,
      toLang: state.fromLang,
    };
  }

  if (type === "SET_FROM_LANG") {
    if (state.fromLang === action.payload) return state;

    const loading = state.fromText !== "";

    return {
      ...state,
      fromLang: action.payload,
      result: "",
      loading,
    };
  }

  if (type === "SET_TO_LANG") {
    if (state.toLang === action.payload) return state;

    const loading = state.fromText !== "";

    return {
      ...state,
      toLang: action.payload,
      result: "",
      loading,
    };
  }

  if (type === "SET_FROM_TEXT") {
    const loading = action.payload !== "";

    return {
      ...state,
      loading,
      fromText: action.payload,
      result: "",
    };
  }

  if (type === "SET_RESULT") {
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }

  return state;
}

export function useLanguage() {
  const [{ fromLang, toLang, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState);

  const interchangeLang = () => {
    dispatch({ type: "INTERCHANGE_LANG" });
  };

  const setFromLang = (payload: FromLang) => {
    dispatch({ type: "SET_FROM_LANG", payload });
  };

  const setToLang = (payload: Language) => {
    dispatch({ type: "SET_TO_LANG", payload });
  };

  const setFromText = (payload: string) => {
    dispatch({ type: "SET_FROM_TEXT", payload });
  };

  const setResult = (payload: string) => {
    dispatch({ type: "SET_RESULT", payload });
  };

  return {
    fromLang,
    toLang,
    fromText,
    result,
    loading,
    interchangeLang,
    setFromLang,
    setToLang,
    setFromText,
    setResult,
  };
}
