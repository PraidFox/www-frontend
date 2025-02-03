/**NF - name field*/

/**Имя полей для формы регистрации*/
export enum NF_Registration {
    EMAIL = 'email',
    login = 'login',
    password = 'password',
    passwordRepeat = 'passwordRepeat'
}

/**Имя полей для формы авторизации*/
export enum NF_Auth {
    emailOrLogin = 'emailOrLogin',
    password = 'password',
    remember = 'remember'
}

/**Имя полей для формы сброса пароля*/
export enum NF_ResetPassword {
    emailOrLogin = 'emailOrLogin',
}

/**Имя полей для формы замены пароля после сброса*/
export enum NF_ResetChangePassword {
    password = 'password',
    passwordRepeat = 'passwordRepeat',
}

