import {skipToken, useQuery} from "@tanstack/react-query";
import {GisService} from "../../api/services/2gis/Gis.service.ts";
import {SearchLocationGisDto} from "../../Models/gis.dto.ts";

export const useGetLocationsGit = (queryDto: SearchLocationGisDto | undefined) => {
    console.log("queryDto", queryDto?.query)
    return useQuery({
        queryKey: ['locations', queryDto?.query],
        queryFn: queryDto ? async (meta) => {
            return GisService.getLocations(queryDto, meta)
        } : skipToken
    })
}