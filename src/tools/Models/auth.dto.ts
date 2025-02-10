export interface AuthDto {
    emailOrLogin: string,
    password: string,
}

export interface RegisterDto {
    login: string,
    email: string,
    password: string,
    passwordRepeat: string,
    //urlVerifyEmail передаю в самом запросе
}

export interface ITokenResponse {
    token: string
    expire: Date
}

export interface PasswordResetDto {
    password: string,
    passwordRepeat: string,
}
