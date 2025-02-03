import {skipToken, useMutation, useQuery} from "@tanstack/react-query";
import {VerifyService} from "../../api/services/Verify.service.ts";
import {AxiosError} from "axios";


export const useVerifyEmail = (token: string | null) => {
    return useQuery({
        queryKey: ['verifyEmail'],
        queryFn: token ? async () => {
            try {
                return await VerifyService.verifyEmail(token)
            } catch (error) {
                const err = error as AxiosError<{ message: string, error: string, statusCode: number }>

                //TODO разобраться как лучше работать с ошибками
                switch (err.response?.data.message) {
                    case 'А зачем ты даёшь мне некорректный токен?':
                        throw new Error('Некорректный токен')
                    case 'Время жизни токена подошло к концу':
                        throw new Error('Необходимо повторно направить письмо для верификации почты')
                    default:
                        throw new Error(err.response?.data.message)
                }
            }
        } : skipToken,
        select: (data) => data.data
    })
}

export const useSendVerifyEmail = () => {
    return useMutation({
        mutationKey: ["sendVerifyEmail"],
        mutationFn: async () => await VerifyService.sendVerifyEmail()
    })
}