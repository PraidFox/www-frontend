import {RoomLocation} from "../../../../tools/Models/room.dto.ts";
import {Button} from "antd";
import {useParams} from "react-router";
import {useGetMe} from "../../../../tools/hooks/queries/User.queries.ts";

export const LocationAndInfo = ({location}: { location: RoomLocation }) => {
    const {roomId} = useParams();
    const {data: infoUser} = useGetMe()

    return (
        <>
            {location.location.name}
            <br/>
            {location.location.address}
            <br/>
            {location.location.url}
            <br/>
            {location.exactDate}
            <br/>
            {location.description}
            <br/>
            <Button>Точно буду</Button>
            <Button>Пас</Button>
            <Button>Обдумываю, по обстоятельствам</Button>
        </>
    )
}