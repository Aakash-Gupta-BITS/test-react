import React from "react";
import { signOut } from "../services/authenticate.js";
import { Button } from "@chakra-ui/react";
import ProfilePage from "./ProfilePage";

const HomePage = ({ showLoading, onSignChange, Data, showToast }) => {
  return (
    <div>
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
            showToast(ex.message, "error");
          }
          showLoading(false);
          onSignChange();
        }}
      >
        Sign out
      </Button>
      <ProfilePage Content={Data} />
    </div>
  );
};

export default HomePage;
