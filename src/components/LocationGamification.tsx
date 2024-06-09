import { Flex, Text, Center, Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getBusiness } from "../api/business";
import Typeslide from "../components/Typeslide";
import LocationCard from "./LocationCard";
import RainbowText from "./RainbowText";

export default function LocationGamification() {
  const [business, setBusiness] = useState([]);
  const [total, setTotal] = useState(0);

  const [randomBusiness, setRandomBusiness] = useState(null);

  function getRandomNumber(max: number) {
    return Math.floor(Math.random() * (max + 1));
  }

  async function fetchGetBusiness() {
    const business = await getBusiness(1, 1000);

    setTotal(business?.meta?.pagination?.dataCount || 0);
    setBusiness(business?.data || []);
  }

  useEffect(() => {
    fetchGetBusiness();
  }, []);

  useEffect(() => {
    setRandomBusiness(business[getRandomNumber(total)] || null);
  }, [total]);

  const handlePassLocation = (id: number) => {
    const newBusiness = business.filter(
      (busi: { id: number }) => busi.id !== id
    );
    setBusiness(newBusiness);
    setTotal(newBusiness.length);

    if (newBusiness.length === 0) {
      fetchGetBusiness();
    }
  };

  return (
    <Flex p="5" mt="20" w={["100%", "80%"]} mx="auto" direction={"column"}>
      <RainbowText
        text={
          <>
            {" "}
            Location For{" "}
            <Typeslide
              texts={["You", "Fun", "Friends"]}
              delay={3050}
              height={["38px", "55px", "55px", "95px"]}
            ></Typeslide>{" "}
            ✨
          </>
        }
      />

      <Text
        as="span"
        mx="auto"
        className={"crimson-regular"}
        fontSize={["1rem", "2rem"]}
      >
        Enjoy our random location you might interest!
      </Text>
      <LocationCard
        props={randomBusiness}
        onPassLocation={
          total ? () => handlePassLocation((randomBusiness as any)?.id) : null
        }
      />
      <Center mt={5} height={["200px", "250px"]}>
        <Divider
          borderWidth={"2px"}
          borderColor="orange.600"
          orientation="vertical"
        />
      </Center>
    </Flex>
  );
}
