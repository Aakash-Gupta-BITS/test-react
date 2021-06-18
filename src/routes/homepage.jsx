import React from "react";
import { signOut } from "../services/authenticate.js";
import { useToast } from "@chakra-ui/react";

const HomePage = ({ showLoading, onSignChange }) => {
  const toast = useToast();
  const JSONprops = {
    variant: "left-accent",
    position: "top-right",
    duration: 4000,
    isClosable: true,
  };

  return (
    <>
      <label
        type="button"
        className="btn btn-primary"
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
        Sign Out
      </label>
    </>
  );
};

export default HomePage;
