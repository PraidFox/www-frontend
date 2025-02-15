import {axiosClient} from "../axios.config.ts";
import {
    CreateCommentDto,
    CreateRoomDto,
    RoomDto,
    RoomFullDto,
    UpdateCommentDto,
    UpdateReactionDto,
    UpdateRoomDto
} from "../../Models/room.dto.ts";

export class RoomsService {
    private static path = '/rooms';

    static async getMyRoomsIsAuthor(userId: number, {signal}: {
        signal?: AbortSignal
    }): Promise<RoomDto[]> {
        const {data} = await axiosClient.get(`${this.path}/myRoomsIsAuthor/${userId}`, {signal});
        return data
    }

    static async getRoom(id: number, {signal}: {
        signal?: AbortSignal
    }): Promise<RoomDto> {
        const {data} = await axiosClient.get(`${this.path}/${id}`, {signal});
        return data
    }

    static async getRoomFull(id: number, {signal}: {
        signal?: AbortSignal
    }): Promise<RoomFullDto> {
        const {data} = await axiosClient.get(`${this.path}/${id}/full`, {signal});
        return data
    }

    static async createRoom(room: CreateRoomDto): Promise<RoomDto> {
        const {data} = await axiosClient.post(`${this.path}`, room);
        return data
    }

    static async updateRoom(room: UpdateRoomDto): Promise<RoomDto> {
        const {data} = await axiosClient.patch(`${this.path}`, room);
        return data
    }

    static async updateReaction(reaction: UpdateReactionDto) {
        const {data} = await axiosClient.patch(`${this.path}/updateReaction`, reaction)
        return data
    };

    static async createComment(commentDto: CreateCommentDto) {
        await axiosClient.post(`${this.path}/createComment`, commentDto)
    }

    static async updateComment(commentDto: UpdateCommentDto) {
        await axiosClient.patch(`${this.path}/updateComment`, commentDto)
    }
}