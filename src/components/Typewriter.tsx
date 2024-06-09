import { useState, useEffect } from "react";

const Typewriter = ({
  texts,
  delay,
  infinite,
}: {
  texts: string[];
  delay: number;
  infinite?: boolean;
}) => {
  let timeout: NodeJS.Timeout;
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < texts[textIndex].length) {
      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + texts[textIndex][currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
    } else if (textIndex < texts.length - 1) {
      setTimeout(() => {
        setCurrentIndex(0);
        setCurrentText("");
        setTextIndex((prevIndex) => prevIndex + 1);
      }, delay);
    } else if (infinite) {
      setTimeout(() => {
        setCurrentIndex(0);
        setCurrentText("");
        setTextIndex(0);
      }, delay);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, texts, textIndex, infinite]);

  return <span>{currentText}</span>;
};

export default Typewriter;
