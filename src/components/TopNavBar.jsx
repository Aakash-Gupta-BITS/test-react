import React from "react";
import { Flex, Spacer, Button, Heading, Center, Box } from "@chakra-ui/react";

const TopNavigationBar = ({ title, names, onClick }) => {
  return (
    <Flex p={0} m={0} bg="gray.900" boxShadow="base">
      <Center pl={4}>
        <Heading size="lg">{title}</Heading>
      </Center>
      <Spacer />
      <Box>
        {names.map((currentelement, index) => (
          <Button
            key={index}
            borderRadius={0}
            bg="base"
            height={16}
            fontSize="lg"
            onClick={() => onClick(currentelement)}
            minWidth={24}
          >
            {currentelement}
          </Button>
        ))}
      </Box>
    </Flex>
  );
};

export default TopNavigationBar;
