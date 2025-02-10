import {axiosClient} from "../axios.config.ts";
import {AxiosPromise} from "axios";
import {ITokenResponse} from "../../Models/auth.dto.ts";


export class TokenService {
    private static path = '/auth';

    static async refreshToken(): Promise<AxiosPromise<ITokenResponse>> {
        return await axiosClient.get(`${this.path}/refreshToken`)
    }

    static async checkToken(token: string): Promise<AxiosPromise> {
        return await axiosClient.get(`${this.path}/checkToken?token=${token}`)
    }
}