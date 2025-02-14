import {useGetMe} from "../../../tools/hooks/queries/User.queries.ts";
import {useGetMyRoomsAuthor} from "../../../tools/hooks/queries/Rooms.queries.ts";
import {Button} from "antd";
import {NavLink} from "react-router";

export const RoomsPage = () => {
    const {data: infoUser} = useGetMe()
    const {data: rooms} = useGetMyRoomsAuthor(infoUser?.id)

    if (!infoUser) return <div>Ой, а такого пользователя нет</div>
    if (!rooms) return <div>Что-то пошло не так при получении комнат, хотя бы пустой массив должен был вернуться</div>


    return <div>
        RoomPage
        <br/>
        <NavLink to="/rooms/create" end>
            <Button>Создать комнату</Button>
        </NavLink>

        <br/><br/><br/>
        {rooms.length > 0 ? rooms.map(room =>
            <div key={room.id}>
                {room.title}
                <NavLink to={`/rooms/room/${room.id}`} end>
                    <Button>Войти в комнату</Button>
                </NavLink>
            </div>
        ) : <div>Нет комнат</div>}

    </div>
}