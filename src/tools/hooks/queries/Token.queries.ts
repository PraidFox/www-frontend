import {TokenService} from "../../api/services/Token.service.ts";
import {skipToken, useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";

export const useCheckToken = (token: string | null) => {
    return useQuery({
        queryKey: [token],
        queryFn: token ? async () => {
            try {
                return await TokenService.checkToken(token)
            } catch (error) {
                const err = error as AxiosError<{ message: string, error: string, statusCode: number }>
                if (err.response) {
                    throw new Error(err.response.data.message)
                }
            }
        } : skipToken
    })
}