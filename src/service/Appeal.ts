import { httpClient } from "@/httpClient";
import { Appeal, AppealRequest, ServerResponse } from "@/types";

export class AppealService {
    static addAppeal(appeal: AppealRequest): ServerResponse<Appeal> {
        const response = httpClient.post("/private/api/appeals", appeal);
        return response;
    }

    static getAppeals(): ServerResponse<Appeal[]> {
        const response = httpClient.get("/private/api/appeals/all");
        return response;
    }
}
