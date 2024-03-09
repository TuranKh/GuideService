import { httpClient } from "@/httpClient";
import { EnumResponse, ServerResponse } from "@/types";

export type EnumType = "APPEAL_STATUS" | "EMPLOYEE_TYPE" | "GUIDE_CATEGORY" | "GUIDE_TYPE" | "LANGUAGE" | "PAYMENT_TYPE" | "GENDER_TYPE";

export class EnumService {
    static getEnumList(enumType: EnumType): ServerResponse<EnumResponse[]> {
        const response = httpClient.get(`/private/api/enums?type=${enumType}`);
        return response;
    }
}
