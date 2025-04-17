import React from "react";
import { createRoot } from "react-dom/client";

import "./app.css";
import { MainPage } from "./components";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>
);
