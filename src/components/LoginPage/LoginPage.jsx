import React from "react";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { Card } from "./Card";
import { LoginForm } from "./LoginForm";
import { DividerWithText } from "./DividerWithText";

import { FaGoogle } from "react-icons/fa";

export const LoginPage = ({Header, onSignClick}) => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "inherit")}
      minH="100vh"
      py="12"
      px={{
        base: "4",
        lg: "8",
      }}
    >
      <Box maxW="md" mx="auto">
        <Heading textAlign="center" size="xl" fontWeight="extrabold" mb="8">
          {Header}
        </Heading>
        <Card>
          <LoginForm />
          <DividerWithText mt="6">User Login</DividerWithText>
          <SimpleGrid mt="6" columns={1}>
            <Button
              color="currentColor"
              variant="outline"
              onClick={onSignClick}
            >
              <VisuallyHidden>Sign in with Google</VisuallyHidden>
              <FaGoogle />
              <Text ml="4">Sign in with Google</Text>
            </Button>
          </SimpleGrid>
        </Card>
      </Box>
    </Box>
  );
};