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
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Suspense fallback={<Loading />}>
                    <DesignConfigProvider
                        theme={{
                            token: {
                                colorPrimary: "#2F4160",
                            },
                        }}
                        componentSize='large'
                        renderEmpty={CustomNoOptions}
                        locale={AzLocale}
                    >
                        <RouterProvider router={router} />
                    </DesignConfigProvider>
                </Suspense>
            </QueryClientProvider>
            <Toaster position='bottom-right' />
        </>
    );
}

export default App;
