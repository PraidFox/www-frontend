import {useMutation} from "@tanstack/react-query";
import {IAuth, IRegistration, IResetPassword} from "../../interfaces/auth.interface.ts";
import {AuthService} from "../../api/services/Auth.service.ts";
import {queryClient} from "../../api/query.config.ts";
import {StorageKeys} from "../../storage/localStorage.storage.ts";
import {clearTokenInfo} from "../../utils/localStorage.utils.ts";
import {AxiosError} from "axios";

export const useAuth = () => {
    return useMutation({
        mutationKey: ["login"],
        mutationFn: async ({auth, rememberMe}: { auth: IAuth, rememberMe: boolean }) => {
            localStorage.setItem(StorageKeys.REMEMBER_ME, rememberMe.toString())
            return await AuthService.loginUser(auth)
        },
        onSuccess: async (response) => {
            localStorage.setItem(StorageKeys.ACCESS_TOKEN, response.token);
            localStorage.setItem(StorageKeys.EXPIRED_TOKEN, response.expire.toString());
            await queryClient.invalidateQueries({queryKey: ['getMe']});
        },
        onError: async () => {

            clearTokenInfo()
        }
    })
}


export const useLogout = () => {
    //const navigate = useNavigate();

    return useMutation({
        mutationKey: ["logout"],
        mutationFn: async () => {
            await AuthService.logoutUser();
        },
        onSuccess: async () => {
            clearTokenInfo()
            await queryClient.invalidateQueries({queryKey: ['getMe']});
        }
    })
}

export const useRegistration = () => {
    return useMutation({
        mutationKey: ["registration"],
        mutationFn: async (registration: IRegistration) => {
            const response = await AuthService.registrationUser(registration);
            return response.data;
        },
    })
}

export const useSendMailResetPassword = () => {
    return useMutation({
        mutationKey: ["sendMailResetPassword"],
        mutationFn: async (email: string) => {
            try {
                return await AuthService.sendMailResetPassword(email)
            } catch (error) {
                const err = error as AxiosError<{ message: string[], error: string, statusCode: number }>
                if (err.response) {
                    const messages = err.response.data.message
                    throw new Error(messages.join(', '))
                }
            }
        }
    })
}

export const useResetPassword = () => {
    return useMutation({
        mutationKey: ["resetPassword"],
        mutationFn: async (data: IResetPassword) => {
            try {
                return await AuthService.resetPassword(data)
            } catch (error) {
                const err = error as AxiosError<{ message: string[], error: string, statusCode: number }>
                if (err.response) {
                    const messages = err.response.data.message
                    throw new Error(messages.join(', '))
                }
            }
        }
    })
}