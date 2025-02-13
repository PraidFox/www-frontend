import {Form, FormItemProps, Input} from "antd";

export const DescriptionField = (formItemProps: FormItemProps) => {
    return <Form.Item {...formItemProps}>
        <Input.TextArea/>
    </Form.Item>
}