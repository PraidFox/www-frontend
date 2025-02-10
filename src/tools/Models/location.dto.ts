import {BaseEntity} from "./base.dto.ts";

export interface LocationDTO extends BaseEntity {
    id: number
    name: string
    url: string
    address: string
}

export interface CreateLocationDto {
    name: string
    url?: string
    address?: string
}

