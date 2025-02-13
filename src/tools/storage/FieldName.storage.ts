/**NF - name field*/

/**Имена полей для формы регистрации*/
export enum NF_Registration {
    EMAIL = 'email',
    login = 'login',
    password = 'password',
    passwordRepeat = 'passwordRepeat'
}

/**Имена полей для формы авторизации*/
export enum NF_Auth {
    emailOrLogin = 'emailOrLogin',
    password = 'password',
    remember = 'remember'
}

/**Имена полей для формы сброса пароля*/
export enum NF_ResetPassword {
    emailOrLogin = 'emailOrLogin',
}

/**Имена полей для формы замены пароля после сброса*/
export enum NF_ResetChangePassword {
    password = 'password',
    passwordRepeat = 'passwordRepeat',
}

/**Имена полей для формы создания комнаты*/
export enum NF_CreateRoom {
    nameRoom = 'nameRoom',
    members = 'members',
    description = 'description',
    dateType = 'dateType',
    dateAllLocation = 'dateAllLocation',
    location_data = 'location_data',
    location_description = 'location_description',
    new_location_name = 'new_location_name',
    new_location_address = 'new_location_address',
    new_location_url = 'new_location_url',
    new_location_data = 'new_location_data',
    new_location_description = 'new_location_description',
}

