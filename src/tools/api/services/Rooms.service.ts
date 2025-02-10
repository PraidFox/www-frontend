import {axiosClient} from "../axios.config.ts";
import {RoomDto} from "../../Models/room.dto.ts";

export class RoomsService {
    private static path = '/rooms';

    static async getMyRoomsIsAuthor(userId: number, {signal}: {
        signal?: AbortSignal
    }): Promise<RoomDto[]> {
        const {data} = await axiosClient.get(`${this.path}/myRoomsIsAuthor/${userId}`, {signal});
        return data
    }

    static async createRoom(room: RoomDto): Promise<RoomDto> {
        const {data} = await axiosClient.post(`${this.path}`, room);
        return data
    }
}