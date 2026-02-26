import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";

import "./i18n/i18n";
import { LanguageProvider } from "./context/LanguageContext";

createRoot(document.getElementById("root")).render(
  <LanguageProvider>
    <RouterProvider router={router} />
  </LanguageProvider>,
);
