import {useLayoutEffect, useRef} from 'react';

/**
 * useDebounce - кастомный хук для дебаунса функции
 * @param callback - функция, которую нужно дебаунсить
 * @param  delay - задержка в миллисекундах
 * @returns функция, которая будет вызывать callback с дебаунсом
 */

export const useDebounce = <T extends (...args: never[]) => void>(callback: T, delay: number) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const debouncedFunction = (...args: Parameters<T>) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };


    useLayoutEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return debouncedFunction;
};
