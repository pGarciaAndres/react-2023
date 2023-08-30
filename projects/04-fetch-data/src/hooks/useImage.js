import { useEffect, useState } from "react";

export function useImage({ fact }) {
  const [image, setImage] = useState();
  const hostB = "https://cataas.com/cat/says";

  const getImage = async () => {
    if (!fact) return;
    const firstWord = fact.split(" ", 2).join(" ");
    const urlImg = `${hostB}/${firstWord}`;

    const resImg = await fetch(urlImg);
    const { url } = resImg;
    setImage(url);
    // ===
    // fetch(urlImg).then((response) => {
    //   const { url } = response;
    //   setImage(url);
    // });
  };

  useEffect(() => {
    getImage();
  }, [fact]);

  return { image };
}
