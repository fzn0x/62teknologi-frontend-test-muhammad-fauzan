import { Center, Divider, Flex, Text } from "@chakra-ui/react";
import RainbowText from "./RainbowText";

import Typeslide from "../components/Typeslide";

export default function Intro() {
  return (
    <Flex p="5" mt="20" w={["100%", "80%"]} mx="auto" direction={"column"}>
      <RainbowText text={"Around Me✨"} />
      <Flex direction={"row"} mx="auto">
        <Text fontSize={["1rem", "2rem", "2rem", "3rem"]}>
          Find{" "}
          <Typeslide
            texts={["business", "food", "culture", "location"]}
            delay={3050}
            height={["20px", "45px", "45px", "65px"]}
          ></Typeslide>{" "}
          around{" "}
          <Text
            fontSize={["1rem", "2rem", "2rem", "3rem"]}
            as={"span"}
            fontWeight={"bold"}
            color="orange.600"
          >
            <Typeslide
              texts={[
                "you 🫵❤️",
                "the world 🌎",
                "your destination 📍",
                "your hometown 🏠",
              ]}
              delay={3050}
              height={["20px", "45px", "45px", "65px"]}
            ></Typeslide>
          </Text>
        </Text>
      </Flex>
      <Center mt={5} height={["200px", "450px"]}>
        <Divider
          borderWidth={"2px"}
          borderColor="orange.600"
          orientation="vertical"
        />
      </Center>
    </Flex>
  );
}
