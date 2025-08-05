import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/Home/App.jsx";
import Header from "./components/Header.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <App />
  </StrictMode>
);
