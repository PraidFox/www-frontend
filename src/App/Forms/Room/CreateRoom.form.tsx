import {Button, DatePicker, Form} from "antd";
import {useForm} from "antd/es/form/Form";
import {NameRoomField} from "./Fields/NameRoom.field.tsx";
import {MappingLocation} from "./components/MappingLocation.tsx";
import {UserField} from "./Fields/User.field.tsx";
import {DateTypeField} from "./Fields/DateType.field.tsx";
import {optionsDateTypeType} from "../../../tools/constant/options.constant.ts";
import {useState} from "react";
import {IOptLocation} from "../../../tools/interfaces/option.interface.ts";
import {NF_CreateRoom} from "../../../tools/storage/FieldName.storage.ts";
import {IFieldsForForms} from "../../../tools/interfaces/fieldsForForms.interface.ts";
import {useCreateRoom} from "../../../tools/hooks/queries/Rooms.queries.ts";
import {useGetMe} from "../../../tools/hooks/queries/User.queries.ts";
import {convertDataToPost} from "./CreateRoom.helper.ts";

export const CreateRoomFrom = () => {
    const [selectedLocations, setSelectedLocations] = useState<{ index: number, location: IOptLocation }[]>([])
    const [newLocations, setNewLocations] = useState<{ index: number, location: string }[]>([])
    const {data: infoUser} = useGetMe()

    const createRoom = useCreateRoom()

    const [form] = useForm()
    const typeDateValue: optionsDateTypeType = Form.useWatch('dateType', form);

    if (!infoUser) {
        return <div>Загружаем данные</div>
    }

    const save = async (values: IFieldsForForms) => {
        const newRoom = convertDataToPost(values, selectedLocations, newLocations, infoUser, typeDateValue)
        console.log("newRoom", newRoom)
        await createRoom.mutateAsync(newRoom)
    }


    return <Form
        name={'FormCreateRoom'}
        onFinish={save}
        form={form}
    >

        <NameRoomField/>
        <UserField/>
        <DateTypeField/>
        {typeDateValue === 'date_all_location' &&
            <Form.Item name={NF_CreateRoom.dateAllLocation} label="Когда">
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
            </Form.Item>
        }
        <MappingLocation
            form={form}
            dateType={typeDateValue}
            setSelectedLocations={setSelectedLocations}
            selectedLocations={selectedLocations}
            setNewLocations={setNewLocations}
            newLocations={newLocations}
        />


        <Button type="primary" htmlType="submit">
            Создать
        </Button>
    </Form>
}