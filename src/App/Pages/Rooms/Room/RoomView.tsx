import {useParams} from "react-router";
import {useGetRoom} from "../../../../tools/hooks/queries/Rooms.queries.ts";
import {DateType} from "../../../../tools/constant/options.constant.ts";
import {LocationAndInfo} from "./LocationAndInfo.tsx";

export const RoomView = () => {
    const {roomId} = useParams();

    //const {data: infoUser} = useGetMe()
    const {data: room} = useGetRoom(Number(roomId))

    if (room === undefined) return <div>Комната не нашлась</div>

    return (
        <>
            <h2>{room.title}</h2>
            <p>{room.description}</p>
            Кто: {room.members.map(member => member.member.login).join(', ')}
            <ul>
                Куда:
                {room.locations.map(location =>
                    <li key={location.id}>
                        <LocationAndInfo location={location}></LocationAndInfo>
                    </li>)}
            </ul>

            {room.dateType === DateType.ALL_LOCATIONS_DATE && <p>Когда: {room.exactDate.toString()}</p>}


        </>
    )
}
