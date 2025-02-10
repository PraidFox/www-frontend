import {axiosClient} from "../axios.config.ts";
import {AllUser, UserDto} from "../../Models/user.dto.ts";
import {AxiosPromise} from "axios";

export class UserService {
    private static path = '/users';

    static async getMe({signal}: { signal?: AbortSignal }): Promise<AxiosPromise<UserDto>> {
        return await axiosClient.get(`${this.path}/me`, {signal});
    }

    static async getUser(idOrLogin: string | number, {signal}: {
        signal?: AbortSignal
    }): Promise<AxiosPromise<UserDto>> {
        return await axiosClient.get(`${this.path}/${idOrLogin}`, {signal});
    }

    static async getAllUser({signal}: { signal?: AbortSignal }): Promise<AllUser> {
        const {data} = await axiosClient.get(`${this.path}/all`, {signal})
        return data
    }

    static async getSessionsUser({signal}: { signal?: AbortSignal }) {
        return await axiosClient.get(`${this.path}/mySessions`, {signal})
    }


}