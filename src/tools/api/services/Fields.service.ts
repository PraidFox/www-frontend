import {axiosClient} from "../axios.config.ts";
import {FieldDto} from "../../Models/fields.dto.ts";


export class FieldsService {
    private static path = '/fields';

    static async getField(fieldId: number): Promise<FieldDto> {
        const {data} = await axiosClient.get(`${this.path}/${fieldId}`)
        return data
    }
}