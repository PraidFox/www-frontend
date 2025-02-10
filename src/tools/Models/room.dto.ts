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
    existingLocations?: LocationMoreInfoDto
    newLocations?: CreateRoomLocationDto
    authorId: number
    membersId: number[]
}

export interface LocationMoreInfoDto {
    existingLocationsId: number
    exactDate: Date
    description: string
}

export interface CreateRoomLocationDto extends CreateLocationDto {
    exactDate: Date
    description: string
}