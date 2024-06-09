import {
  Box,
  Text,
  Image,
  Card,
  CardHeader,
  Flex,
  Avatar,
  Heading,
  CardBody,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import { getABusiness } from "../api/business";
import LocationCard from "../components/LocationCard";
import Navbar from "../components/Navbar";

function Detail() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const params = useParams();

  const [business, setBusiness] = useState(null);

  async function fetchGetABusiness() {
    const business = await getABusiness(Number(params.id));

    setBusiness(business?.data || null);
  }

  useEffect(() => {
    fetchGetABusiness();
  }, [params]);

  return (
    <>
      <Navbar />
      <LocationCard props={business} detailMode={true} />

      {((business as any)?.reviews || []).length ? (
        <>
          {" "}
          <Text
            w="100%"
            align={"center"}
            mx="auto"
            className={"crimson-regular"}
            fontSize={["1rem", "2rem"]}
          >
            What They Say
          </Text>
          <Box w="50%" mx="auto" className="slider-container">
            <Slider {...settings}>
              {((business as any)?.reviews || []).map(
                (review: { [key: string]: unknown }) => (
                  <Box py={5}>
                    <Text align={"center"}>
                      {(review?.userImageUrl as string) ? (
                        <Image
                          mx="auto"
                          objectFit="cover"
                          maxW={{
                            base: "100%",
                            sm: "100%",
                            lg: "500px",
                          }}
                          src={review?.userImageUrl as string}
                          alt={review?.text as string}
                        />
                      ) : (
                        (review?.text as string)
                      )}
                    </Text>
                  </Box>
                )
              )}
            </Slider>

            <SimpleGrid columns={2} py={10} spacingX="40px" spacingY="20px">
              {((business as any)?.reviews || []).map(
                (review: { [key: string]: unknown }) => (
                  <Card maxW="md">
                    <CardHeader>
                      <Flex>
                        <Flex
                          flex="1"
                          gap="4"
                          alignItems="center"
                          flexWrap="wrap"
                        >
                          <Avatar
                            name={review?.userName as string}
                            src={review?.userImageUrl as string}
                          />

                          <Box>
                            <Heading size="sm">
                              {review?.userName as string}
                            </Heading>
                            <Text>Customer</Text>
                          </Box>
                        </Flex>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Text>{review?.text as string}</Text>
                    </CardBody>
                    <Image
                      objectFit="cover"
                      src={review?.userImageUrl as string}
                      alt={review?.userImageUrl as string}
                    />
                  </Card>
                )
              )}
            </SimpleGrid>
          </Box>
        </>
      ) : (
        <Text
          w="100%"
          align={"center"}
          mx="auto"
          className={"crimson-regular"}
          fontSize={["1rem", "2rem"]}
        >
          No reviews found
        </Text>
      )}
    </>
  );
}

export default Detail;
