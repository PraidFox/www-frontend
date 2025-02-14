import {DatePicker, Form, Input} from "antd";
import {DateType} from "../../../../tools/constant/options.constant.ts";
import {IOptLocation} from "../../../../tools/interfaces/option.interface.ts";
import {NF_CreateRoom} from "../../../../tools/storage/FieldName.storage.ts";
import {RoomLocation} from "../../../../tools/Models/room.dto.ts";
import dayjs from "dayjs";

export const ExistingLocation = ({selected, dateType, defaultValues}: {
    selected: { index: number, location: IOptLocation },
    dateType: DateType
    defaultValues?: RoomLocation
}) => {


    return <>
        Наименование: {selected.location.label}
        <br/>
        Адресс: {selected.location.info?.address}
        <br/>
        Ссылка: {selected.location.info?.url}
        <br/>
        {dateType === DateType.EACH_LOCATION_DATE &&
            <Form.Item
                name={NF_CreateRoom.location_data + selected.index.toString()}
                label="Когда"
                initialValue={dayjs(defaultValues?.exactDate)}
            >
                <DatePicker showTime/>
            </Form.Item>
        }
        <Form.Item
            label="Дополнительная информация"
            name={NF_CreateRoom.location_description + selected.index.toString()}
            initialValue={defaultValues?.description}
        >
            <Input.TextArea/>
        </Form.Item>
    </>
}