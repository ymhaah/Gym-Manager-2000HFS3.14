import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

import App from "./App.tsx";
import Manager from "./components/Manager.tsx";

import "./index.css";

// TODO: Statistics page
// TODO: About me page

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App />}>
            <Route path="/" element={<Manager />} />
            <Route path="/Home" element={<Manager />} />
            <Route path="/Statistics" element={<h1>statistics</h1>} />
            <Route path="/About" element={<h1>about</h1>} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <NextUIProvider>
            <RouterProvider router={router} />
        </NextUIProvider>
    </React.StrictMode>
);
