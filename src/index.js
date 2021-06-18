import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "./components/ProfileCard/profile.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./routes/App";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <>
    <App infoToast={toast.info} errorToast={toast.error} />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
    />
  </>,
  document.getElementById("root")
);
