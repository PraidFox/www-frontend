import {skipToken, useQuery} from "@tanstack/react-query";
import {GisService} from "../../api/services/2gis/Gis.service.ts";
import {SearchLocationGisDto} from "../../Models/gis.dto.ts";

export const useGetLocationsGit = (queryDto?: SearchLocationGisDto) => {
    return useQuery({
        queryKey: ['locations'],
        queryFn: queryDto ? async (meta) => {
            return GisService.getLocations(queryDto, meta)
        } : skipToken
    })
}