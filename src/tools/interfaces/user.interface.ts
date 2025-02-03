interface BaseEntity {
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
}

export interface User extends BaseEntity {
    id: number,
    login: string,
    email: string,
    emailVerifiedAt: Date,
}

export interface UserSession extends BaseEntity {
    id: number,
    user: BaseEntity,
    sessionMetadata: string
}

export interface UserAndSession extends User {
    sessions: Omit<UserSession[], 'user'>
}

export interface AllUser {
    users: User[],
    count: number
}