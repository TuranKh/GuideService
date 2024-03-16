export const tokenSetter = function ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
};

export const tokenGetter = function () {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    return {
        accessToken,
        refreshToken,
    };
};
