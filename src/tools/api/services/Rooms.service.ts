import {axiosClient} from "../axios.config.ts";
import {IRoom} from "../../interfaces/room.interface.ts";

export class RoomsService {
    private static path = '/rooms';

    static async getMyRoomsIsAuthor(userId: number, {signal}: {
        signal?: AbortSignal
    }): Promise<IRoom[]> {
        const {data} = await axiosClient.get(`${this.path}/myRoomsIsAuthor/${userId}`, {signal});
        return data
    }

    static async createRoom(room: IRoom): Promise<IRoom> {

    }
}