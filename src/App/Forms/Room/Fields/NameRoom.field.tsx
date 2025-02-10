import {Form, Input} from "antd";
import {NF_CreateRoom} from "../../../../tools/storage/FieldName.storage.ts";

export const NameRoomField = () => {
    return <Form.Item label="Название комнаты" name={NF_CreateRoom.nameRoom}
                      rules={[{required: true, message: 'Необходимо дать название'}]}>
        <Input/>
    </Form.Item>
}