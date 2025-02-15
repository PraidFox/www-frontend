import {NavLink, useParams} from "react-router";
import {DateType, RoomLocationUserReaction} from "../../../../tools/constant/options.constant.ts";
import {LocationAndInfo} from "./LocationAndInfo.tsx";
import {useGetRoomFull} from "../../../../tools/hooks/queries/Rooms.queries.ts";
import {UserRoomReactionDto} from "../../../../tools/Models/room.dto.ts";
import {UserDto} from "../../../../tools/Models/user.dto.ts";
import {Button} from "antd";
import {useGetMe} from "../../../../tools/hooks/queries/User.queries.ts";
import {Comment} from "./Comment.tsx";

export const RoomView = () => {
    const {roomId} = useParams();

    const {data: infoUser} = useGetMe()
    const {data: room} = useGetRoomFull(Number(roomId))


    if (roomId == undefined) return <div>Комната не нашлась</div>
    if (room == undefined) return <div>Комната не нашлась</div>
    if (infoUser == undefined) return <div>Пользователь не нашолся</div>

    const getReactionsForLocations = (locationId: number, reactions: UserRoomReactionDto[]): UserRoomReactionDto[] => {
        return reactions.filter(reaction => reaction.location.id == locationId)
    }

    const getUsersNotReactions = (userRoomReactions: UserRoomReactionDto[]): UserDto[] => {
        return userRoomReactions.filter(userReaction => userReaction.reaction == RoomLocationUserReaction.NOT_REACTION).map(userReaction => userReaction.user)
    }


    return (
        <>
            {infoUser.id === room.author.id &&
                <NavLink to={`/rooms/edit/${room.id}`} end>
                    <Button>Внести изменения</Button>
                </NavLink>
            }
            <h2>{room.title}</h2>
            <p>{room.description}</p>
            Кто: {room.members.map(member => member.member.login).join(', ')}
            <ul>
                Куда:
                {room.locations.map(location =>
                    <li key={location.id}>
                        <LocationAndInfo location={location}
                                         userReactions={getReactionsForLocations(location.location.id, room.userReactions)}></LocationAndInfo>
                    </li>)}
            </ul>

            {room.dateType === DateType.ALL_LOCATIONS_DATE && <p>Когда: {room.exactDate.toString()}</p>}

            Еще не
            проголосовали: {getUsersNotReactions(room.userReactions).map(user => user.login).join(', ') || 'Все молодцы, все проголосовали!'}

            {room.comments.map(commentDto =>
                <Comment
                    key={commentDto.id}
                    commentDto={commentDto}
                    roomId={Number(roomId)}
                    authorId={commentDto.author.id}
                />
            )}

            <br/>
            <Comment roomId={Number(roomId)} authorId={infoUser.id}></Comment>
        </>
    )
}
