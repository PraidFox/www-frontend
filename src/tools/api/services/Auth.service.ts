import {axiosClient} from "../axios.config.ts";
import {AxiosPromise} from "axios";

import {AuthDto, ITokenResponse, PasswordResetDto, RegisterDto} from "../../Models/auth.dto.ts";

export class AuthService {
    private static path = '/auth';

    static async registrationUser(registrationData: RegisterDto): Promise<AxiosPromise<{ id: number }>> {
        const data = {
            ...registrationData,
            urlVerifyEmail: import.meta.env.VITE_APP_BASE_URL + 'verifyEmail/'
        }
        return await axiosClient.post(`${this.path}/register`, data)

    }

    static async loginUser(auth: AuthDto): Promise<ITokenResponse> {
        const {data} = await axiosClient.post(`${this.path}/login`, auth)
        console.log("data", data)
        return data
    }

    static async logoutUser(): Promise<AxiosPromise> {
        return await axiosClient.post(`${this.path}/logout`)
    }


    static async sendMailResetPassword(emailOrLogin: string): Promise<AxiosPromise> {
        const data = {
            emailOrLogin: emailOrLogin,
            urlVerifyResetPassword: import.meta.env.VITE_APP_BASE_URL + 'resetPassword/'
        }
        console.log(data)
        return await axiosClient.post(`${this.path}/sendMailResetPassword`, data)
    }


    static async resetPassword(data: PasswordResetDto, token: string) {
        return await axiosClient.put(`${this.path}/resetPassword?token=${token}`, {
            password: data.password,
            passwordRepeat: data.passwordRepeat
        })
    }
}