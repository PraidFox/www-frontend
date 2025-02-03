import {NF_Auth, NF_Registration, NF_ResetChangePassword, NF_ResetPassword} from "../storage/FieldName.storage.ts";

export type IFieldRegistration = {
    [NF_Registration.EMAIL]: string;
    [NF_Registration.login]: string;
    [NF_Registration.password]: string;
    [NF_Registration.passwordRepeat]: string;
};

export type IFieldAuth = {
    [NF_Auth.emailOrLogin]: string;
    [NF_Auth.password]: string;
    [NF_Auth.remember]: boolean;
};

export type IFieldResetPassword = {
    [NF_ResetPassword.emailOrLogin]: string;
};

export type IFieldResetChangePassword = {
    [NF_ResetChangePassword.password]: string;
    [NF_ResetChangePassword.passwordRepeat]: string;
};
