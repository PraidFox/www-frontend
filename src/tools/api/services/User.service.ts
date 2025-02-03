import {axiosClient} from "../axios.config.ts";
import {AllUser, User} from "../../interfaces/user.interface.ts";
import {AxiosPromise} from "axios";

export class UserService {
    private static path = '/users';

    static async getMe({signal}: { signal?: AbortSignal }): Promise<AxiosPromise<User>> {
        return await axiosClient.get(`${this.path}/me`, {signal});
    }

    static async getUser(idOrLogin: string | number, {signal}: { signal?: AbortSignal }): Promise<AxiosPromise<User>> {
        return await axiosClient.get(`${this.path}/${idOrLogin}`, {signal});
    }

    static async getAllUser({signal}: { signal?: AbortSignal }): Promise<AxiosPromise<AllUser>> {
        return await axiosClient.get(`${this.path}/all`, {signal})
    }

    static async getSessionsUser({signal}: { signal?: AbortSignal }) {
        return await axiosClient.get(`${this.path}/mySessions`, {signal})
    }


}