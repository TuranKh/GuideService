import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider as DesignConfigProvider, ThemeConfig } from "antd";
import "./index.css";
import { router } from "./router/router.tsx";
import AzLocale from "antd/locale/az_AZ";
import { Loading } from "./components/Loading/index.tsx";
import { CustomNoOptions } from "./components/CustomNoOptions/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Suspense fallback={<Loading />}>
            <DesignConfigProvider componentSize='large' renderEmpty={CustomNoOptions} locale={AzLocale}>
                <RouterProvider router={router} />
            </DesignConfigProvider>
        </Suspense>
    </React.StrictMode>,
);
