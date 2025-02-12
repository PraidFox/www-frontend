import {BaseEntity} from "./base.dto.ts";
import {CreateLocationDto} from "./location.dto.ts";

export interface RoomDto extends BaseEntity {
    id: number,
    title: string
    description: string
    //TODO дописать
}

export interface CreateRoomDto {
    title: string
    description?: string
    existingLocationsAndDetails?: LocationAndDetailsDto[]
    newLocationsAndDetails?: NewLocationAndDetailsDto[]
    authorId: number
    membersId: number[]
    exactDate?: string
}

interface DetailsForWhere {
    exactDate?: string//Date
    description?: string
}

export interface LocationAndDetailsDto extends DetailsForWhere {
    existingLocationsId: number

}

export interface NewLocationAndDetailsDto extends DetailsForWhere {
    newLocation: CreateLocationDto
    exactDate?: string
    description?: string
}