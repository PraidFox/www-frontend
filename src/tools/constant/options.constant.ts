export enum DateType {
    ALL_LOCATIONS_DATE = 'all_locations_date', // Общая дата для всех локаций
    EACH_LOCATION_DATE = 'each_location_date', // Отдельная дата для каждой локации
}

export const optionsDateType = [
    {value: DateType.EACH_LOCATION_DATE, label: "Своя дата для каждой локации"},
    {value: DateType.ALL_LOCATIONS_DATE, label: "Одна дата дляв всех локаций"},
]

