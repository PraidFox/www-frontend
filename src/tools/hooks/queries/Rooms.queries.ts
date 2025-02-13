import {skipToken, useMutation, useQuery} from "@tanstack/react-query";
import {RoomsService} from "../../api/services/Rooms.service.ts";
import {CreateRoomDto, RoomDto} from "../../Models/room.dto.ts";
import {queryClient} from "../../api/query.config.ts";

export const useGetMyRoomsAuthor = (userId: number | undefined) => {
    return useQuery({
        queryKey: ['myRooms', 'getMyRoomsAuthor'],
        queryFn: userId ? async (meta) => {
            return await RoomsService.getMyRoomsIsAuthor(userId, meta)
        } : skipToken
    })
}

export const useCreateRoom = () => {
    return useMutation({
        mutationFn: async (room: CreateRoomDto) => {
            await RoomsService.createRoom(room)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['myRooms']});
        }
    })
}

export const useGetRoom = (id: number | undefined) => {
    return useQuery({
        queryKey: ['getRoom', `rooId_${id}`],
        queryFn: id ? async (meta): Promise<RoomDto> => {
            return await RoomsService.getRoom(id, meta)
        } : skipToken
    })
}

