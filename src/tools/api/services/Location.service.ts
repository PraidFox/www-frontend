import {axiosClient} from "../axios.config.ts";
import {ILocationDTO} from "../../interfaces/location.interface.ts";

export class LocationService {
    private static path = '/locations';

    static async getLocations(): Promise<ILocationDTO[]> {
        const {data} = await axiosClient.get(`${this.path}/getAll`)
        return data
    }
}