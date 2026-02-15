
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";

import "./i18n/i18n"

createRoot(document.getElementById('root')).render(
<RouterProvider router={router} />
)
