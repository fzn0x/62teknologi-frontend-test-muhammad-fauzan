import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Button,
  Input,
  Text,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import { LegacyRef, RefObject, useEffect, useState } from "react";
import { FiltersSchema } from "./../api/business";

export function FilterButton({
  btnRef,
  onOpen,
}: {
  btnRef?: LegacyRef<HTMLButtonElement> | null;
  onOpen?: () => void;
}) {
  return (
    <Button
      ref={btnRef}
      className="crimson-bold"
      colorScheme={"orange"}
      onClick={onOpen}
    >
      Filters
    </Button>
  );
}

export default function FilterDrawer({
  btnRef,
  isOpen = false,
  onClose,
  handleFilter,
}: {
  btnRef: (RefObject<any> | undefined) & (LegacyRef<HTMLButtonElement> | null);
  isOpen: boolean;
  onClose: () => void;
  handleFilter: (filters: FiltersSchema) => void;
}) {
  const [name, setName] = useState<string | undefined>();
  const [minRating, setMinRating] = useState<number | undefined>();
  const [maxRating, setMaxRating] = useState<number | undefined>();
  const [minReviewCount, setMinReviewCount] = useState<number | undefined>();
  const [maxReviewCount, setMaxReviewCount] = useState<number | undefined>();

  const labelStyles = {
    mt: "2",
  };

  useEffect(() => {
    // reset filters on open
    setName(undefined);
    setMinRating(undefined);
    setMaxRating(undefined);
    setMinReviewCount(undefined);
    setMaxReviewCount(undefined);
  }, []);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Let's Filter!</DrawerHeader>

          <DrawerBody>
            <Flex direction={"column"} my={2}>
              <Text>Search Business:</Text>
              <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value as string)}
              />
            </Flex>
            <Flex direction={"column"} mb={10} gap={5}>
              <Text>Min Rating:</Text>
              <Slider
                defaultValue={0}
                min={0}
                max={5}
                step={1}
                onChange={(val) => setMinRating(val)}
              >
                <SliderMark value={0} {...labelStyles}>
                  0
                </SliderMark>
                <SliderMark value={1} {...labelStyles}>
                  1
                </SliderMark>
                <SliderMark value={2} {...labelStyles}>
                  2
                </SliderMark>
                <SliderMark value={3} {...labelStyles}>
                  3
                </SliderMark>
                <SliderMark value={4} {...labelStyles}>
                  4
                </SliderMark>
                <SliderMark value={5} {...labelStyles}>
                  5
                </SliderMark>
                <SliderMark
                  value={Number(minRating)}
                  textAlign="center"
                  bg="blue.500"
                  color="white"
                  mt="-10"
                  ml={minRating == 5 ? "-7" : "-5"}
                  w="12"
                  overflow={"hidden"}
                >
                  {minRating}
                </SliderMark>
                <SliderTrack bg="orange.100">
                  <SliderFilledTrack bg="orange.600" />
                </SliderTrack>
                <SliderThumb boxSize={6} />
              </Slider>
            </Flex>
            <Flex direction={"column"} my={10} gap={5}>
              <Text>Max Rating:</Text>
              <Slider
                defaultValue={0}
                min={0}
                max={5}
                step={1}
                onChange={(val) => setMaxRating(val)}
              >
                <SliderMark value={0} {...labelStyles}>
                  0
                </SliderMark>
                <SliderMark value={1} {...labelStyles}>
                  1
                </SliderMark>
                <SliderMark value={2} {...labelStyles}>
                  2
                </SliderMark>
                <SliderMark value={3} {...labelStyles}>
                  3
                </SliderMark>
                <SliderMark value={4} {...labelStyles}>
                  4
                </SliderMark>
                <SliderMark value={5} {...labelStyles}>
                  5
                </SliderMark>
                <SliderMark
                  value={Number(maxRating)}
                  textAlign="center"
                  bg="blue.500"
                  color="white"
                  mt="-10"
                  ml={maxRating == 5 ? "-7" : "-5"}
                  w="12"
                  overflow={"hidden"}
                >
                  {maxRating}
                </SliderMark>
                <SliderTrack bg="orange.100">
                  <SliderFilledTrack bg="orange.600" />
                </SliderTrack>
                <SliderThumb boxSize={6} />
              </Slider>
            </Flex>
            <Flex direction={"column"} my={2}>
              <Text>Min Review Count:</Text>
              <NumberInput
                step={1}
                defaultValue={0}
                min={0}
                max={100000}
                onChange={(val) => setMinReviewCount(Number(val))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
            <Flex direction={"column"} my={2}>
              <Text>Max Review Count:</Text>
              <NumberInput
                step={1}
                defaultValue={0}
                min={0}
                max={100000}
                onChange={(val) => setMaxReviewCount(Number(val))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() =>
                handleFilter({
                  name: name,
                  minRating: minRating,
                  maxRating: maxRating,
                  minReviewCount: minReviewCount,
                  maxReviewCount: maxReviewCount,
                })
              }
            >
              Apply Filters
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
