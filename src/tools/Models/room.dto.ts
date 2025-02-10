import {CreateLocationDto} from "./location.dto.ts";
import {BaseEntity} from "./base.dto.ts";

export interface RoomDto extends BaseEntity {
    id: number,
    title: string
    description: string
    //TODO дописать
}

export interface CreateRoomDto {
    title: string
    description: string
    existingLocations?: LocationMoreInfoDto[]
    newLocations?: CreateRoomLocationDto[]
    authorId: number
    membersId: number[]
    exactDate?: string
}

export interface LocationMoreInfoDto {
    existingLocationsId: string
    exactDate?: string
    description?: string
}

export interface CreateRoomLocationDto extends CreateLocationDto {
    exactDate?: string
    description?: string
}