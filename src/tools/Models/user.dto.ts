import {BaseEntity} from "./base.dto.ts";

export interface UserDto extends BaseEntity {
    id: number,
    login: string,
    email: string,
    emailVerifiedAt: Date,
}

export interface UserSessionDto extends BaseEntity {
    id: number,
    user: UserDto,
    sessionMetadata: string
}

export interface UserAndSession extends UserDto {
    sessions: Omit<UserSessionDto[], 'user'>
}

export interface AllUser {
    users: UserDto[],
    count: number
}