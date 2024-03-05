import App from "@/App";
import { PageNotFound } from "@/components/PageNotFound";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import { Payments } from "@/pages/Payments";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
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
                path: "/payments",
                element: <Payments />,
            },
        ],
    },
    {
        path: "*",
        element: <PageNotFound />,
    },
]);
