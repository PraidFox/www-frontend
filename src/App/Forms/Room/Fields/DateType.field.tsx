import {Form, Radio} from "antd";
import {optionsDateType} from "../../../../tools/constant/options.constant.ts";
import {NF_CreateRoom} from "../../../../tools/storage/FieldName.storage.ts";

export const DateTypeField = () => {
    return <Form.Item name={NF_CreateRoom.dateType} initialValue={"date_all_location"}>
        <Radio.Group options={optionsDateType}/>
    </Form.Item>
}