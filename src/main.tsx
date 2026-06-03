import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/annotation.css";
import { applyStoredTheme } from "./components/ThemeToggle";

applyStoredTheme();

createRoot(document.getElementById("root")!).render(<App />);
