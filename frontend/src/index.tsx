import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import App from "./App";
import { Toaster } from "react-hot-toast"; // https://react-hot-toast.com/docs

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    <Toaster /> {/* Toaster is being used for notifications */}
  </React.StrictMode>
);
