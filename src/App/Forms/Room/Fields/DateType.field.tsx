import {Form, FormItemProps, Radio} from "antd";
import {DateType, optionsDateType} from "../../../../tools/constant/options.constant.ts";
import {NF_CreateRoom} from "../../../../tools/storage/FieldName.storage.ts";

export const DateTypeField = (formItemProps: FormItemProps) => {
    return <Form.Item name={NF_CreateRoom.dateType} initialValue={DateType.ALL_LOCATIONS_DATE} {...formItemProps}>
        <Radio.Group options={optionsDateType}/>
    </Form.Item>
}