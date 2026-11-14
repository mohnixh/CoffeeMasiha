import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import "./motion.css";
import "./espresso.css";
import "./discovery.css";
import "./shelf.css";
import "./details.css";

const root = document.getElementById("root")!;
const app = <StrictMode><App /></StrictMode>;

if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
