import {RoomLocation, UserRoomReactionDto} from "../../../../tools/Models/room.dto.ts";
import {useGetMe} from "../../../../tools/hooks/queries/User.queries.ts";
import {RoomLocationUserReaction} from "../../../../tools/constant/options.constant.ts";
import {useUpdateReaction} from "../../../../tools/hooks/queries/Rooms.queries.ts";
import {useLayoutEffect, useState} from "react";
import {Button} from "antd";

export const LocationAndInfo = ({location, userReactions}: {
    location: RoomLocation,
    userReactions: UserRoomReactionDto[]
}) => {
    const [myReaction, setMyReaction] = useState<UserRoomReactionDto>()
    const [changeReaction, setChangeReaction] = useState<boolean>(false)
    const {data: infoUser} = useGetMe()
    const updateReaction = useUpdateReaction()


    useLayoutEffect(() => {
        setMyReaction(userReactions.find(userReaction => userReaction.user.id === infoUser?.id))
    }, [infoUser, userReactions]);


    if (!myReaction) {
        return <div>А такое разве может быть?</div>
    }

    const handleChangeReaction = async (reaction: RoomLocationUserReaction) => {
        await updateReaction.mutateAsync({
            id: myReaction.id,
            reaction: reaction
        })
        setChangeReaction(false)
    }

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
            {userReactions?.map(userReaction => <div key={userReaction.id}>
                {userReaction.reaction !== RoomLocationUserReaction.NOT_REACTION &&
                    <span>{userReaction.user.login}: {userReaction.reaction}</span>}
            </div>)}
            <br/>
            {(myReaction?.reaction === RoomLocationUserReaction.NOT_REACTION || changeReaction) && <>
                <Button onClick={() => handleChangeReaction(RoomLocationUserReaction.SUCCESS)}>Точно буду</Button>
                <Button onClick={() => handleChangeReaction(RoomLocationUserReaction.FAIL)}>Пас</Button>
                <Button onClick={() => handleChangeReaction(RoomLocationUserReaction.THIS)}>Обдумываю, по
                    обстоятельствам</Button>
            </>}

            {(!changeReaction && myReaction?.reaction != RoomLocationUserReaction.NOT_REACTION) &&
                <Button onClick={() => setChangeReaction(true)}>Изменить реакцию</Button>}


        </>
    )
}