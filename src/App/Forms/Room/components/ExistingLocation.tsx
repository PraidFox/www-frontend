import {DatePicker, Form, Input} from "antd";
import {optionsDateTypeType} from "../../../../tools/constant/options.constant.ts";
import {IOptLocation} from "../../../../tools/interfaces/option.interface.ts";
import {NF_CreateRoom} from "../../../../tools/storage/FieldName.storage.ts";

export const ExistingLocation = ({selected, dateType}: {
    selected: { index: number, location: IOptLocation },
    dateType: optionsDateTypeType
}) => {
    return <>
        Наименование: {selected.location.label}

        <br/>
        Адресс: {selected.location.info?.address}
        <br/>
        Ссылка: {selected.location.info?.url}
        <br/>
        {dateType === 'date_for_every_location' &&
            <Form.Item name={NF_CreateRoom.location_data + selected.index.toString()} label="Когда">
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
            </Form.Item>
        }
        <Form.Item label="Дополнительная информация" name={NF_CreateRoom.location_info + selected.index.toString()}>
            <Input.TextArea/>
        </Form.Item>
    </>
}