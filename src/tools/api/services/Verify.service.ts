import {axiosClient} from "../axios.config.ts";

export class VerifyService {
    private static path = '/auth';

    static async verifyEmail(token: string) {
        return await axiosClient.get(`${this.path}/verifyEmail?token=${token}`)
    }

    static async sendVerifyEmail() {
        const url = import.meta.env.VITE_APP_BASE_URL + 'verifyEmail/'
        return await axiosClient.post(`${this.path}/sendVerifyEmail`, {url})
    }
}