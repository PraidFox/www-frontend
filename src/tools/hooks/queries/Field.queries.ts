import {useQuery} from "@tanstack/react-query";
import {FieldsService} from "../../api/services/Fields.service.ts";

export const useGetField = (fieldId: number) => {
    return useQuery({
        queryKey: ['getField', fieldId],
        queryFn: async () => {
            return await FieldsService.getField(fieldId)
        }
    })
}