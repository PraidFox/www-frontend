import {DatePicker, Form, Input} from "antd";
import {optionsDateTypeType} from "../../../../tools/constant/options.constant.ts";
import {NF_CreateRoom} from "../../../../tools/storage/FieldName.storage.ts";

export const NewLocation = ({selected, dateType}: {
    selected: { index: number, location: string },
    dateType: optionsDateTypeType
}) => {
    return <>
        <Form.Item label="Наименование" name={NF_CreateRoom.new_location_name + selected.index.toString()}
                   initialValue={selected.location}>
            <Input/>
        </Form.Item>

        <Form.Item label="Адресс" name={NF_CreateRoom.new_location_address + selected.index.toString()}>
            <Input/>
        </Form.Item>
        {dateType === 'date_for_every_location' &&
            <Form.Item name={NF_CreateRoom.new_location_data + selected.index.toString()} label="Когда">
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
            </Form.Item>
        }
        <Form.Item label="Ссылка" name={NF_CreateRoom.new_location_url + selected.index.toString()}>
            <Input/>
        </Form.Item>
        <Form.Item label="Дополнительная информация" name={NF_CreateRoom.new_location_info + selected.index.toString()}>
            <Input.TextArea/>
        </Form.Item>
    </>
}