import axios from "axios";
import { tokenGetter } from "./lib/tokenHandler";

const { accessToken } = tokenGetter();

export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER_URL,
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
});
