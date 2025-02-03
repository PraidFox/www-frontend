import {skipToken, useQuery} from "@tanstack/react-query";
import {RoomsService} from "../../api/services/Rooms.service.ts";

export const useGetMyRoomsAuthor = (userId: number | undefined) => {
    return useQuery({
        queryKey: ['getMyRoomsAuthor'],
        queryFn: userId ? async (meta) => {
            return await RoomsService.getMyRoomsIsAuthor(userId, meta)
        } : skipToken
    })
}