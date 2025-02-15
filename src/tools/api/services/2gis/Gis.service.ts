import {ResponseGisDto, SearchLocationGisDto} from "../../../Models/gis.dto.ts";
import {axios2Gis} from "../../axios.config.ts";

export class GisService {
    private static path = '/items';

    private static key = import.meta.env.VITE_KEY_2GIS;

    static async getLocations(queryDto: SearchLocationGisDto, {signal}: {
        signal?: AbortSignal
    }): Promise<ResponseGisDto> {
        const {data} = await axios2Gis.get(`${this.path}?key=${(this.key)}&city_id=${queryDto.cityId}&q=${queryDto.query}>&type=branch&fields=items.rubrics`, {signal});
        return data
    }
}


//4926434862694425 - Хабаровск