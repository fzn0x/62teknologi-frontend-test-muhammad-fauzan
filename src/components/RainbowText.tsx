import { Text, keyframes } from "@chakra-ui/react";
import { ReactNode } from "react";

const rainbow = keyframes`
  0% { color: red; }
  14% { color: orange; }
  28% { color: yellow; }
  42% { color: green; }
  57% { color: blue; }
  71% { color: indigo; }
  85% { color: violet; }
  100% { color: red; }
`;

const RainbowText = ({ text }: { text: ReactNode | string }) => {
  return (
    <Text
      animation={`${rainbow} 3s linear infinite`}
      fontSize={["3rem", "4rem", "5rem"]}
      mx="auto"
      className={"crimson-bold-italic"}
    >
      {text}
    </Text>
  );
};

export default RainbowText;
