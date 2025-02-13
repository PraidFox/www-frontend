import {BaseEntity} from "./base.dto.ts";
import {CreateLocationDto, LocationDTO} from "./location.dto.ts";
import {DateType} from "../constant/options.constant.ts";
import {UserDto} from "./user.dto.ts";

export interface RoomDto extends BaseEntity {
    author: UserDto
    dateType: DateType
    description: string
    exactDate: Date //Или стринг?
    id: number,
    locations: RoomLocations[]
    members: { id: number, member: UserDto }[]
    roomStatus: string
    title: string
    //whenRoomClose
    //whenRoomDeleted
}

export interface RoomLocations extends DetailsForWhere {
    id: number,
    location: LocationDTO
}

export interface CreateRoomDto {
    title: string
    description?: string
    existingLocationsAndDetails?: LocationAndDetailsDto[]
    newLocationsAndDetails?: NewLocationAndDetailsDto[]
    dateType: DateType
    authorId: number
    membersId: number[]
    exactDate?: Date
}

interface DetailsForWhere {
    exactDate?: Date
    description?: string
}

export interface LocationAndDetailsDto extends DetailsForWhere {
    existingLocationsId: number
}

export interface NewLocationAndDetailsDto extends DetailsForWhere {
    newLocation: CreateLocationDto
}