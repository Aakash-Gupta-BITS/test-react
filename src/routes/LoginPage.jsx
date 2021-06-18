import React from "react";
import GoogleSignInButton from "../components/login/GoogleSignInButton";
import { signIn, isSignedIn } from "../services/authenticate.js";
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
    <>
      <GoogleSignInButton
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
        width="191"
        display={!isSignedIn()}
      />
    </>
  );
};

export default LoginPage;
