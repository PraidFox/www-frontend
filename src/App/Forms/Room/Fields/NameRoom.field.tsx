import {Form, Input} from "antd";

export const NameRoomField = () => {
    return <Form.Item label="Название комнаты" name="nameRoom"
                      rules={[{required: true, message: 'Необходимо дать название'}]}>
        <Input/>
    </Form.Item>
}