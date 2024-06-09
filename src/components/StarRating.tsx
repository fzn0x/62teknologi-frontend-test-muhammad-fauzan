import { Text, Box, HStack } from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating }: { rating: number }) => {
  // Round the rating to the nearest half
  const roundedRating = Math.round(rating * 2) / 2;

  // Generate star icons based on the rounded rating
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(<FaStar color="#FFBF00" key={i} />);
    } else if (i - 0.5 === roundedRating) {
      stars.push(<FaStarHalfAlt color="#FFBF00" key={i} />);
    } else {
      stars.push(<FaRegStar color="#FFBF00" key={i} />);
    }
  }

  return (
    <HStack spacing="1">
      {stars}
      <Text py="2">({rating})</Text>
    </HStack>
  );
};

export default StarRating;
