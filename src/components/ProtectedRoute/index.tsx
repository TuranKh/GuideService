import { tokenGetter } from "@/lib/tokenHandler";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = function () {
    const { accessToken } = tokenGetter();

    return <>{accessToken ? <Outlet /> : <Navigate to={"/login"} />}</>;
};
