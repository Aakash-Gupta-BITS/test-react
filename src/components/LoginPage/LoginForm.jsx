import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import * as React from "react";
import { PasswordField } from "./PasswordField";

import { useToast } from "@chakra-ui/react";

export const LoginForm = (props) => {
  const toast = useToast();
  const JSONprops = {
    variant: "left-accent",
    position: "top-right",
    duration: 4000,
    isClosable: true,
  };

  return (
    <chakra.form
      onSubmit={(e) => {
        e.preventDefault(); // your login logic here
      }}
      {...props}
    >
      <Stack spacing="6">
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input name="email" type="email" autoComplete="email" required />
        </FormControl>
        <PasswordField />
        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          fontSize="md"
          onClick={() => {
            toast({
              description: "Invalid Credentials",
              status: "error",
              ...JSONprops,
            });
          }}
        >
          Admin Sign In
        </Button>
      </Stack>
    </chakra.form>
  );
};
