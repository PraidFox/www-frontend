import {axiosClient} from "../axios.config.ts";
import {AxiosPromise} from "axios";
import {IAuth, IRegistration, IResetPassword, ITokenResponse} from "../../interfaces/auth.interface.ts";

export class AuthService {
    private static path = '/auth';

    static async registrationUser(registrationData: IRegistration): Promise<AxiosPromise<{ id: number }>> {
        const data = {
            ...registrationData,
            urlVerifyEmail: import.meta.env.VITE_APP_BASE_URL + 'verifyEmail/'
        }
        return await axiosClient.post(`${this.path}/register`, data)

    }

    static async loginUser(auth: IAuth): Promise<ITokenResponse> {
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


    static async resetPassword(data: IResetPassword) {
        return await axiosClient.put(`${this.path}/resetPassword?token=${data.token}`, {
            password: data.password,
            passwordRepeat: data.passwordRepeat
        })
    }
}