import { httpClient } from "@/httpClient";
import { ServerResponse } from "@/types";

type LoginRequest = {
    username: string;
    password: string;
};

type AuthResponse = {
    id: number;
    type: string;
    token: string;
    refreshToken: string;
    roles: string[];
};

type CreateUserRequest = {
    username: string;
    plaintextPassword: string;
    pin: string;
    genderTypeId: number;
    lastName: string;
    firstName: string;
    fatherName: string;
    birth: string;
};

type RefreshTokenResponse = {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
};

export class AuthService {
    static async loginUser(loginData: LoginRequest): Promise<ServerResponse<AuthResponse>> {
        return httpClient.post("/public/api/auth/login", loginData);
    }

    static async createUser(createUserData: CreateUserRequest): Promise<any> {
        return httpClient.post("/public/api/auth/create-user", createUserData);
    }

    static async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
        return httpClient.post("/public/api/auth/refresh-token", null, {
            params: { refreshToken },
        });
    }
}

export default AuthService;
