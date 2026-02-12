// 🔥 Required polyfills for algosdk (Vite fix)
import { Buffer } from "buffer";
import process from "process";

window.Buffer = Buffer;
window.process = process;
window.global = window;

// -------------------------------

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
