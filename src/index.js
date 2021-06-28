import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "./components/ProfileCard/profile.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./routes/App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools"
import CodePage from "./routes/CodePage";
import HighLighter from "./routes/HighLighter";
// const hljs = require("highlight.js/lib/common");


const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
})

const theme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: "dark"
  },
  breakpoints
});

ReactDOM.render(
  
  <div>
  <ChakraProvider theme={theme}>
    <App/>
  </ChakraProvider>
  <HighLighter/>
  </div>,
  document.getElementById("root")
);
