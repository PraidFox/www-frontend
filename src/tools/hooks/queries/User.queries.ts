import {UserService} from "../../api/services/User.service.ts";
import {skipToken, useQuery} from "@tanstack/react-query";
import {StorageKeys} from "../../storage/localStorage.storage.ts";

export const useGetMe = () => {
    return useQuery({
        queryKey: ['getMe'],
        queryFn: async (meta) => {
            if (!localStorage.getItem(StorageKeys.ACCESS_TOKEN)) return Promise.resolve({data: undefined})

            try {
                return await UserService.getMe(meta)
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                return Promise.resolve({data: undefined})
            }
        },
        select: (data) => {
            return data.data
        },
    })
}

export const useUser = (idOrLogin?: number | string) => {
    return useQuery({
        queryKey: ['user', idOrLogin],
        queryFn: idOrLogin ? async (meta) => {
            return await UserService.getUser(idOrLogin, meta)
        } : skipToken,
        select: (data) => {
            return data.data
        }
    })
}

export const useGetAllUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: async (meta) => {
            return await UserService.getAllUser(meta)
        }
    })
}

export const useGetMySession = () => {
    return useQuery({
        queryKey: ['getMySession'],
        queryFn: async (meta) => {
            return await UserService.getSessionsUser(meta)
        },
        select: (data) => {
            return data.data
        }
    })
}