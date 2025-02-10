import {skipToken, useMutation, useQuery} from "@tanstack/react-query";
import {RoomsService} from "../../api/services/Rooms.service.ts";
import {RoomDto} from "../../Models/room.dto.ts";

export const useGetMyRoomsAuthor = (userId: number | undefined) => {
    return useQuery({
        queryKey: ['getMyRoomsAuthor'],
        queryFn: userId ? async (meta) => {
            return await RoomsService.getMyRoomsIsAuthor(userId, meta)
        } : skipToken
    })
}

export const useCreateRoom = () => {
    return useMutation({
        mutationFn: async (room: RoomDto) => {
            await RoomsService.createRoom(room)
        }
    })
}

