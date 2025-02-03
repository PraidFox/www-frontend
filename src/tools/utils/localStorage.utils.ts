import {StorageKeys} from "../storage/localStorage.storage.ts";

export const clearTokenInfo = () => {
    localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(StorageKeys.EXPIRED_TOKEN);
    localStorage.removeItem(StorageKeys.REMEMBER_ME);
}

//Передалтьна класс