import { Flex, Spacer, Link } from "@chakra-ui/react";
import Typewriter from "./Typewriter";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <Flex direction="row" p="5" borderBottom={"1px"} borderColor="orange.600">
      <Flex
        cursor="pointer"
        height={"35px"}
        fontSize={"20px"}
        className="crimson-bold-italic"
        onClick={() => navigate("/")}
      >
        <Typewriter texts={["62 | Around Me"]} delay={200} />
      </Flex>
      <Spacer />
      <Link
        href="https://github.com/fzn0x"
        isExternal
        fontSize={"1.5rem"}
        className={"crimson-bold"}
        mr={5}
      >
        Github
      </Link>
    </Flex>
  );
}

export default Navbar;
