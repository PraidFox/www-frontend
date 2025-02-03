export interface IAuth {
    emailOrLogin: string,
    password: string,
}

export interface IRegistration {
    email: string,
    login: string,
    password: string,
    passwordRepeat: string,
}

export interface ITokenResponse {
    token: string
    expire: Date
}

export interface IResetPassword {
    password: string,
    passwordRepeat: string,
    token: string
}
