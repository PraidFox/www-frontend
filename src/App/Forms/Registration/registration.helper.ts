export const validatePasswordRepeat = (_: any, value: string, password: string) => {
    if (!value || value === password) {
        return Promise.resolve();
    }
    return Promise.reject(new Error('Пароли не совпадают'));
}