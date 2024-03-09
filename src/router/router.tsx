import { PageNotFound } from "@/components/PageNotFound";
import { Calendar } from "@/pages/Calendar";
import Main from "@/pages/Dashboard";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "dashboard",
                element: <Calendar />,
            },
            {
                path: "calendar",
                element: <Calendar />,
            },
            {
                path: "*",
                element: <PageNotFound />,
            },
        ],
    },
]);
