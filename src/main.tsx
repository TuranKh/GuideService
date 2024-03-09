import dayjs from "dayjs";
import "dayjs/locale/az";
import updateLocale from "dayjs/plugin/updateLocale";
import weekday from "dayjs/plugin/weekday";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

dayjs.extend(updateLocale);
dayjs.extend(weekday);
dayjs.locale("az");

export const weekdayNames = ["Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə", "Bazar"];

dayjs.updateLocale("az", {
    weekdays: weekdayNames,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
