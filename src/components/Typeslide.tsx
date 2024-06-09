import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";

const Typeslide = ({
  texts,
  delay,
  height,
}: {
  texts: string[];
  delay: number;
  height?: string | string[];
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, delay);

    return () => clearInterval(intervalId);
  }, [texts.length, delay]);

  return (
    <Box
      display="inline-block"
      position="relative"
      height={height || "65px"}
      lineHeight="1em"
      verticalAlign="middle"
      overflow="hidden"
    >
      {texts.map((text, index) => (
        <Text
          key={index}
          position={index === currentTextIndex ? "relative" : "absolute"}
          opacity={index === currentTextIndex ? 1 : 0}
          transform={
            index === currentTextIndex ? "translateY(0)" : "translateY(100%)"
          }
          transition="opacity 0.5s, transform 0.5s"
          whiteSpace="nowrap"
        >
          {text}
        </Text>
      ))}
    </Box>
  );
};

export default Typeslide;
