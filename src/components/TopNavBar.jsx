import React from "react";
import {
  Flex,
  Spacer,
  Button,
  Heading,
  Center,
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const TopNavigationBar = ({ title, names, onClick }) => {
  return (
    <>
      <Flex
        p={0}
        m={0}
        bg="gray.900"
        boxShadow="base"
        flexDir={["column", "column", "row", "row"]}
      >
        <Center pl={4} h={[12,12,16,16]}>
          <Heading size="lg">{title}</Heading>
        </Center>
        <Spacer />
        <Center display={["flex", "flex", "none", "none"]}>
          {names.map((currentelement, index) => (
            <Button
              key={index}
              borderRadius={0}
              bg="base"
              fontSize="sm"
              onClick={() => onClick(currentelement)}
            >
              {currentelement}
            </Button>
          ))}
        </Center>
        <Flex display={["none", "none", "flex", "flex"]}>
          <Center>
            {names.map((currentelement, index) => (
              <Button
                key={index}
                borderRadius={0}
                bg="base"
                fontSize="lg"
                h={16}
                onClick={() => onClick(currentelement)}
              >
                {currentelement}
              </Button>
            ))}
          </Center>
        </Flex>
      </Flex>
    </>
  );
};

export default TopNavigationBar;
