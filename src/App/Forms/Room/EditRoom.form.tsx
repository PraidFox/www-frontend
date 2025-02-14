import {Button, DatePicker, Form} from "antd";
import {useForm} from "antd/es/form/Form";
import {NameRoomField} from "./Fields/NameRoom.field.tsx";
import {MappingLocation} from "./components/MappingLocation.tsx";
import {UserField} from "./Fields/User.field.tsx";
import {DateTypeField} from "./Fields/DateType.field.tsx";
import {DateType} from "../../../tools/constant/options.constant.ts";
import {useLayoutEffect, useState} from "react";
import {IOptLocation} from "../../../tools/interfaces/option.interface.ts";
import {NF_CreateRoom} from "../../../tools/storage/FieldName.storage.ts";
import {IFieldsForForms} from "../../../tools/interfaces/fieldsForForms.interface.ts";
import {useCreateRoom, useGetRoom, useUpdateRoom} from "../../../tools/hooks/queries/Rooms.queries.ts";
import {useGetMe} from "../../../tools/hooks/queries/User.queries.ts";
import {convertDataToPost} from "./EditRoom.helper.ts";
import {useParams} from "react-router";
import {DescriptionField} from "./Fields/Description.field.tsx";
import dayjs from 'dayjs';

export const EditRoomFrom = () => {
    const {roomId} = useParams();

    const {data: infoUser} = useGetMe()
    const {data: room, isFetching: isFetchingRoom} = useGetRoom(Number(roomId))
    const createRoom = useCreateRoom()
    const updateRoom = useUpdateRoom()

    const [form] = useForm()

    const [selectedLocations, setSelectedLocations] = useState<{
        index: number,
        linkId: number,
        location: IOptLocation
    }[]>([])
    const [newLocations, setNewLocations] = useState<{ index: number, location: string }[]>([])

    const typeDateValue: DateType = Form.useWatch(NF_CreateRoom, form);

    useLayoutEffect(() => {
        if (room && room.locations) {
            //TODO а так ли локации помещать в стейт? Или... подумать
            setSelectedLocations(room.locations.map((location, index) => ({
                index,
                linkId: location.id,
                location: {
                    value: location.location.id,
                    label: location.location.name,
                    info: {address: location.location.address, url: location.location.url}
                }
            })))
        }
    }, [room]);

    if (!infoUser) {
        return <div>Загружаем данные</div>
    }

    if (roomId && isFetchingRoom) {
        return <div>Загружаем данные комнаты</div>
    }

    const save = async (values: IFieldsForForms) => {
        const newRoom = convertDataToPost(values, selectedLocations, newLocations, infoUser, typeDateValue)
        if (room) {
            const membersAndLink: {
                linkId: number,
                memberId: number
            }[] = newRoom.membersId.map(memberId => ({
                memberId: memberId,
                linkId: room.members.find(member => member.member.id === memberId) ? room.members.find(member => member.member.id === memberId)!.id : 0
            }))
            await updateRoom.mutateAsync({...newRoom, members: membersAndLink, id: room.id})
        } else {
            await createRoom.mutateAsync(newRoom)
        }
    }

    return <Form
        name={'FormCreateRoom'}
        onFinish={save}
        form={form}
    >
        <h3>{room?.title}</h3>

        <NameRoomField initialValue={room?.title}/>
        <DescriptionField
            label="Дополнительная информация"
            name={NF_CreateRoom.description}
            initialValue={room?.description}
        />
        <UserField initialValue={room?.members.map(member => member.member.id)}/>
        <DateTypeField initialValue={room?.dateType}/>

        {typeDateValue === DateType.ALL_LOCATIONS_DATE &&
            <Form.Item name={NF_CreateRoom.dateAllLocation} label="Когда"
                       initialValue={room?.exactDate ? dayjs(room.exactDate) : null}>
                <DatePicker showTime/>
            </Form.Item>
        }

        <MappingLocation
            form={form}
            dateType={typeDateValue}
            setSelectedLocations={setSelectedLocations}
            selectedLocations={selectedLocations}
            setNewLocations={setNewLocations}
            newLocations={newLocations}
            defaultValues={room?.locations}
        />


        <Button type="primary" htmlType="submit">
            {room?.title ? "Обновить" : "Создать"}
        </Button>
    </Form>
}