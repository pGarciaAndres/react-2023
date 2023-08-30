import { useEffect, useState } from "react";

export function useFact() {
  const [fact, setFact] = useState();
  const hostA = "https://catfact.ninja/fact";

  const getFact = async () => {
    const urlFact = hostA;

    const res = await fetch(urlFact);
    const { fact } = await res.json();
    setFact(fact);
    // ===
    // fetch(hostA)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const { fact } = data;
    //     setFact(fact);
    //   });
  };

  useEffect(() => {
    getFact();
  }, []);

  return { fact, getFact };
}
