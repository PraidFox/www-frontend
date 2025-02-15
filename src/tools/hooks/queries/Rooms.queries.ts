import {skipToken, useMutation, useQuery} from "@tanstack/react-query";
import {RoomsService} from "../../api/services/Rooms.service.ts";
import {
    CreateCommentDto,
    CreateRoomDto,
    RoomDto,
    RoomFullDto,
    UpdateCommentDto,
    UpdateReactionDto,
    UpdateRoomDto
} from "../../Models/room.dto.ts";
import {queryClient} from "../../api/query.config.ts";

export const useGetMyRoomsAuthor = (userId: number | undefined) => {
    return useQuery({
        queryKey: ['myRooms'],
        queryFn: userId ? async (meta) => {
            return await RoomsService.getMyRoomsIsAuthor(userId, meta)
        } : skipToken
    })
}

export const useGetRoom = (id: number | undefined) => {
    return useQuery({
        queryKey: ['getRoom', `roomId_${id}`],
        queryFn: id ? async (meta): Promise<RoomDto> => {
            return await RoomsService.getRoom(id, meta)
        } : skipToken
    })
}

export const useGetRoomFull = (id: number | undefined) => {
    return useQuery({
        queryKey: ['getRoomFull', `roomId_${id}`],
        queryFn: id ? async (meta): Promise<RoomFullDto> => {
            return await RoomsService.getRoomFull(id, meta)
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

export const useUpdateRoom = () => {
    return useMutation({
        mutationFn: async (room: UpdateRoomDto) => {
            await RoomsService.updateRoom(room)
        },
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({queryKey: ['getRoomFull', `roomId_${variables.id}`]});
            await queryClient.invalidateQueries({queryKey: ['getRoom', `roomId_${variables.id}`]});
        }
    })
}

export const useUpdateReaction = () => {
    return useMutation({
        mutationFn: async (reaction: UpdateReactionDto) => {
            await RoomsService.updateReaction(reaction)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [`getRoomFull`]}); //Оставить так или всё таки прокидывать комнату?
        }
    })
}

export const useCreateComment = () => {
    return useMutation({
        mutationFn: async (commentDto: CreateCommentDto) => {
            await RoomsService.createComment(commentDto)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [`getRoomFull`]});
        }
    })
}

export const useUpdateComment = () => {
    return useMutation({
        mutationFn: async (commentDto: UpdateCommentDto) => {
            await RoomsService.updateComment(commentDto)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [`getRoomFull`]});
        }
    })
}

