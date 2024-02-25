import { ConfigProvider as DesignConfigProvider } from "antd";
import AzLocale from "antd/locale/az_AZ";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { CustomNoOptions } from "./components/CustomNoOptions/index.tsx";
import { Loading } from "./components/Loading/index.tsx";
import "./index.css";
import { router } from "./router/router.tsx";

import "dayjs/locale/az";
import { Toaster } from "react-hot-toast";
import "./App.css";
import "./index.css";

function App() {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <DesignConfigProvider componentSize='large' renderEmpty={CustomNoOptions} locale={AzLocale}>
                    <RouterProvider router={router} />
                </DesignConfigProvider>
            </Suspense>
            <Toaster position='bottom-right' />
        </>
    );
}

export default App;
