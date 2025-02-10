import {Form, Radio} from "antd";
import {optionsDateType} from "../../../../tools/constant/options.constant.ts";

export const DateTypeField = () => {
    return <Form.Item name={"typeDate"} initialValue={"date_all_location"}>
        <Radio.Group options={optionsDateType}/>
    </Form.Item>
}