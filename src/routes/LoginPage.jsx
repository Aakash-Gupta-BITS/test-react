import React from "react";
import { signIn } from "../services/authenticate.js";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { Card } from "../components/Chakra-UI/Card";
import { LoginForm } from "../components/Chakra-UI/LoginForm";
import { DividerWithText } from "../components/Chakra-UI/DividerWithText";

import { FaGoogle } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";

const LoginPage = ({ showLoading, onSignChange }) => {
  const toast = useToast();
  const JSONprops = {
    variant: "left-accent",
    position: "top-right",
    duration: 4000,
    isClosable: true,
  };

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
          Sign in with your BITS account
        </Heading>
        <Card>
          <LoginForm />
          <DividerWithText mt="6">User Login</DividerWithText>
          <SimpleGrid mt="6" columns={1}>
            <Button
              color="currentColor"
              variant="outline"
              onClick={async () => {
                showLoading(true);
                try {
                  await signIn((msg) =>
                    toast({
                      description: msg,
                      status: "info",
                      ...JSONprops,
                    })
                  );
                } catch (ex) {
                  toast({
                    description: ex.message,
                    status: "error",
                    ...JSONprops,
                  });
                }
                showLoading(false);
                onSignChange();
              }}
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

export default LoginPage;
