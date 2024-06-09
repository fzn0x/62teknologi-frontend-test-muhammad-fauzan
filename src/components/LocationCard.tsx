import {
  Flex,
  Text,
  Image,
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

export default function LocationCard({
  props,
  onPassLocation,
  detailMode = false,
}: any) {
  const navigate = useNavigate();

  return (
    <Card
      maxW={["sm", detailMode ? "full" : "full"]}
      my={10}
      mx="auto"
      h={detailMode ? "50%" : "100%"}
      w={["100%", "100%", "50%"]}
      direction={{
        base: "column",
        sm: "column",
        lg: detailMode ? "row-reverse" : "row",
      }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "100%", lg: detailMode ? "60%" : "200px" }}
        src={props?.imageUrl}
        alt={props?.alias}
      />

      <Stack w="100%">
        <CardBody mr={detailMode ? "auto" : 0} w="100%">
          {detailMode ? (
            <>
              <Heading size="md">Telephone</Heading>

              <Text py="2">{props?.displayPhone || "-"}</Text>

              {(props?.displayAddress || []).length !== 0 ? (
                <>
                  {" "}
                  <Heading size="md" my={2}>
                    Address
                  </Heading>
                  {(props?.displayAddress || []).map((address: string) => (
                    <Text>{address || "-"}</Text>
                  ))}
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}

          <Heading size="md" my={2}>
            {props?.name}
          </Heading>

          <Text py="2">
            Total Ratings: <StarRating rating={props?.rating || 0} />
          </Text>
          <Text>Price: {props?.price || "-"}</Text>
          <Text>Review Count: {props?.reviewCount || "-"}</Text>
        </CardBody>

        <CardFooter gap={5}>
          {detailMode ? (
            <></>
          ) : (
            <Button
              size="sm"
              variant="outline"
              colorScheme="orange"
              onClick={() => navigate(`/${props.id}`)}
            >
              See Location Detail
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            colorScheme="blue"
            onClick={() =>
              window.open(
                `https://www.google.com/maps/search/${props?.latitude || "0"},${
                  props?.longitude || "0"
                }`
              )
            }
          >
            See on Google Maps 🗺️
          </Button>
          {!detailMode && onPassLocation ? (
            <Button
              size="sm"
              variant="outline"
              colorScheme="red"
              onClick={onPassLocation}
            >
              Pass Location 🚫
            </Button>
          ) : (
            <></>
          )}
        </CardFooter>
      </Stack>
    </Card>
  );
}
