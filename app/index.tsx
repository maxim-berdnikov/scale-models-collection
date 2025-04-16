import React from "react";
import { createRoot } from "react-dom/client";

import "./app.css";
import { Welcome } from "./welcome/welcome";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Welcome />
  </React.StrictMode>
);
