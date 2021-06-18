import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "./components/ProfileCard/profile.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./routes/App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: "dark"
  }
});

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <App/>
  </ChakraProvider>,
  document.getElementById("root")
);
