import { ConfigProvider as DesignConfigProvider } from "antd";
import AzLocale from "antd/locale/az_AZ";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { CustomNoOptions } from "./components/CustomNoOptions/index.tsx";
import { Loading } from "./components/Loading/index.tsx";
import "./index.css";

import "dayjs/locale/az";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { Sidebar } from "./components/Sidebar/index.tsx";
import "./index.css";
import { Header } from "./pages/Dashboard/index.tsx";

function App() {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <DesignConfigProvider componentSize='large' renderEmpty={CustomNoOptions} locale={AzLocale}>
                    <div className='dashboard-wrapper'>
                        <Sidebar />
                        <main>
                            <Header />
                            <div className='outlet-wrapper'>
                                <Outlet />
                            </div>
                        </main>
                    </div>
                </DesignConfigProvider>
            </Suspense>
            <Toaster position='bottom-right' />
        </>
    );
}

export default App;
