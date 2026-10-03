import React from "react";
import ReactDOM from "react-dom/client";
import "./app/global.css";
import App from "./App";
import { Providers } from "./app/providers";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
);
