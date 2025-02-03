import {axiosClient} from "../axios.config.ts";
import {IField} from "../../interfaces/field.interface.ts";

export class FieldsService {
    private static path = '/fields';

    static async getField(fieldId: number): Promise<IField> {
        const {data} = await axiosClient.get(`${this.path}/${fieldId}`)
        return data
    }
}