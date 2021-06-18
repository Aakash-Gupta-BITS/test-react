import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "./components/ProfileCard/profile.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./routes/App";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <ChakraProvider>
    <App/>
  </ChakraProvider>,
  document.getElementById("root")
);
