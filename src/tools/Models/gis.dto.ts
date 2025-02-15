export interface ResponseGisDto {
    meta: {
        api_version: string
        code: number
        issue_data: string
    }
    result: {
        items: LocationGisDto[]
        total: number
    }
}

export interface LocationGisDto {
    address_comment: string
    address_name: string
    id: number
    name: string
    rubrics: Rubric[]
    type: string
}

export interface SearchLocationGisDto {
    cityId: number
    query: string
}

export interface Rubric {
    alias: string
    id: number
    kind: string
    name: string
}