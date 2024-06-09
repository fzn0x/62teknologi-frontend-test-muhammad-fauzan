import {
  Flex,
  Text,
  useDisclosure,
  createStandaloneToast,
} from "@chakra-ui/react";
import LocationCard from "./LocationCard";
import FilterDrawer, { FilterButton } from "./FilterDrawer";

import { useEffect, useRef, useState } from "react";
import { getBusiness } from "../api/business";
import { FiltersSchema } from "./../api/business";

const { toast } = createStandaloneToast();

export default function LocationGamification() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const [business, setBusiness] = useState([]);

  async function fetchGetBusiness() {
    const business = await getBusiness(1, 100);

    setBusiness(business?.data || []);
  }

  useEffect(() => {
    fetchGetBusiness();
  }, []);

  const handlePassLocation = (id: number) => {
    const newBusiness = business.filter(
      (busi: { id: number }) => busi.id !== id
    );
    setBusiness(newBusiness);

    if (newBusiness.length === 0) {
      fetchGetBusiness();
    }
  };

  const handleFilter = (filters: FiltersSchema) => {
    async function filterGetBusiness() {
      try {
        const business = await getBusiness(1, 100, filters);

        setBusiness(business?.data || []);
        toast({
          title: "Success",
          description: "Changes applied",
          status: "success",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
        onClose();
      } catch (err) {
        toast({
          title: "Something wrong",
          description: (err as Error).message,
          status: "error",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      }
    }

    filterGetBusiness();
  };

  return (
    <Flex p="5" mt="20" w={["100%", "80%"]} mx="auto" direction={"column"}>
      <FilterDrawer
        btnRef={btnRef}
        isOpen={isOpen}
        onClose={onClose}
        handleFilter={handleFilter}
      />
      <Text
        fontSize={["2rem", "3rem", "3rem", "4rem"]}
        mx="auto"
        className={"crimson-bold"}
      >
        Is this unlimited?
      </Text>
      <Text mx="auto" className={"crimson-regular"} fontSize={["1rem", "2rem"]}>
        Lets explore our infinite paging locations below! Can you get to the
        limit? 🤔
      </Text>
      <Text
        as="span"
        mx="auto"
        className={"crimson-regular"}
        fontSize={["1rem", "2rem"]}
      >
        Or maybe just use <FilterButton btnRef={btnRef} onOpen={onOpen} /> ? 🤔
      </Text>
      {business.length === 0 ? (
        <Text mx="auto" fontSize={"2rem"} my={20}>
          No locations found
        </Text>
      ) : (
        <></>
      )}
      {business.map((busi: { [key: string]: unknown; id: number }) => (
        <LocationCard
          props={busi}
          onPassLocation={() => handlePassLocation(busi.id)}
        />
      ))}
    </Flex>
  );
}
