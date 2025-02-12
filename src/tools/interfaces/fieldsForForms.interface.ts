import {
    NF_Auth,
    NF_CreateRoom,
    NF_Registration,
    NF_ResetChangePassword,
    NF_ResetPassword
} from "../storage/FieldName.storage.ts";
import {optionsDateTypeType} from "../constant/options.constant.ts";
import type {Dayjs} from "dayjs";

export interface IFieldRegistration {
    [NF_Registration.EMAIL]: string;
    [NF_Registration.login]: string;
    [NF_Registration.password]: string;
    [NF_Registration.passwordRepeat]: string;
};

export interface IFieldAuth {
    [NF_Auth.emailOrLogin]: string;
    [NF_Auth.password]: string;
    [NF_Auth.remember]: boolean;
};

export interface IFieldResetPassword {
    [NF_ResetPassword.emailOrLogin]: string;
};

export interface IFieldResetChangePassword {
    [NF_ResetChangePassword.password]: string;
    [NF_ResetChangePassword.passwordRepeat]: string;
};

export interface IFieldsForForms {
    [NF_CreateRoom.nameRoom]: string;
    [NF_CreateRoom.members]: number[];
    [NF_CreateRoom.dateType]: optionsDateTypeType;
    [NF_CreateRoom.dateAllLocation]: Dayjs | undefined

    [key: `${NF_CreateRoom.location_data}${number}`]: Dayjs | undefined

    [key: `${NF_CreateRoom.location_info}${number}`]: string | undefined

    [key: `${NF_CreateRoom.new_location_name}${number}`]: string

    [key: `${NF_CreateRoom.new_location_address}${number}`]: string | undefined

    [key: `${NF_CreateRoom.new_location_data}${number}`]: Dayjs | undefined

    [key: `${NF_CreateRoom.new_location_url}${number}`]: string | undefined

    [key: `${NF_CreateRoom.new_location_info}${number}`]: string | undefined
}