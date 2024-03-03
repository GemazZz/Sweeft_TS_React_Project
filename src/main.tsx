import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queyClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/history",
    element: <History />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queyClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
