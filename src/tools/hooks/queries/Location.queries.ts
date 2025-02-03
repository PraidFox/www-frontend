import {useQuery} from "@tanstack/react-query";
import {LocationService} from "../../api/services/Location.service.ts";

export const useGetAllLocations = () => {
    return useQuery({
        queryKey: ['locations'],
        queryFn: async () => {
            return LocationService.getLocations()
        }
    })
}