import { useEffect, useState } from "react";
import { useImage } from "./hooks/useImage";
import "./App.css";
import { useFact } from "./hooks/useFact";

export function App() {
  const { fact, getFact } = useFact();
  const { image } = useImage({ fact });

  const title = "FETCH DATA";
  const buttonText = "GET NEW FACT";

  return (
    <main>
      <h1 data-testid="app-title">{title}</h1>
      <button onClick={getFact}>{buttonText}</button>
      {fact && image && (
        <section>
          {fact && <p>{fact}</p>}
          {image && (
            <img src={image} alt={`Image of facts using the words ${fact}`} />
          )}
        </section>
      )}
    </main>
  );
}
