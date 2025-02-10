import {axiosClient} from "../axios.config.ts";
import {LocationDTO} from "../../Models/location.dto.ts";

export class LocationService {
    private static path = '/locations';

    static async getLocations(): Promise<LocationDTO[]> {
        const {data} = await axiosClient.get(`${this.path}/getAll`)
        return data
    }
}