import { PageNotFound } from "@/components/PageNotFound";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/calendar",
        element: <Dashboard />,
    },
    {
        path: "*",
        element: <PageNotFound />,
    },
]);
