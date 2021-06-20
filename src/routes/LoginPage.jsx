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
import { Card } from "../components/LoginPage/Card";
import { LoginForm } from "../components/LoginPage/LoginForm";
import { DividerWithText } from "../components/LoginPage/DividerWithText";
import { get } from "../services/managers/Endpoint";

import { FaGoogle } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
import { reactLocalStorage } from "reactjs-localstorage";
import { storageTeam } from "../config/storageVars";
import {teamListURL} from "../config/endPoints";

const LoginPage = ({ showLoading, onSignChange, onDataLoad }) => {
  const toast = useToast();
  const JSONprops = {
    variant: "left-accent",
    position: "top-right",
    duration: 4000,
    isClosable: true,
  };

  const loadDataFromServer = async () => {
    return get(teamListURL);
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
                  toast({
                    description: "Getting site data from server",
                    status: "info",
                    ...JSONprops,
                  });
                  const result = await loadDataFromServer();
                  
                  if (!result)
                    throw new Error("Data fetched from server is empty! Contact Developer");
                  reactLocalStorage.setObject(storageTeam, result);
                  onDataLoad(result);
                } catch (ex) {
                  toast({
                    description: ex.message,
                    status: "error",
                    ...JSONprops,
                  });
                }
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
