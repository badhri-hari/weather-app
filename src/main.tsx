import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx"; // The main application file.
import "./App.css"; // The stylesheet for the application.

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App /> {/*Renders the application content. */}
  </React.StrictMode>
);
