import React from "react";
import { signOut } from "../services/authenticate.js";
import { useToast } from "@chakra-ui/react";
import {
  Button
} from "@chakra-ui/react";


const HomePage = ({ showLoading, onSignChange }) => {
  const toast = useToast();
  const JSONprops = {
    variant: "left-accent",
    position: "top-right",
    duration: 4000,
    isClosable: true,
  };

  return (
      <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          fontSize="md"
          onClick={async () => {
            showLoading(true);
            try {
              await signOut();
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
          Sign out
        </Button>
  );
};

export default HomePage;
