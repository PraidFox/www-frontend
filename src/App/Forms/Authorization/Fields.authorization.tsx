import {Checkbox, Form, Input} from "antd";
import {IFieldAuth} from "../../../tools/interfaces/fieldsForForms.interface.ts";
import {NF_Auth} from "../../../tools/storage/FieldName.storage.ts";
import {NavLink} from "react-router";

export const FieldsAuthorization = () => {
    return <>
        <Form.Item<IFieldAuth>
            label="Логин или email"
            name={NF_Auth.emailOrLogin}
            rules={[{required: true, message: 'Пожалуйста введите логин или почту'}]}
            initialValue={"john1"}
        >
            <Input/>
        </Form.Item>

        <Form.Item<IFieldAuth>
            label="Пароль"
            name={NF_Auth.password}
            rules={[{required: true, message: 'Пожалуйста введите пароль'}]}
            initialValue={"12345678"}
        >
            <Input.Password/>
        </Form.Item>

        <Form.Item<IFieldAuth>
            name={NF_Auth.remember}
            valuePropName="checked"
            label={null}
        >
            <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <NavLink to="/resetPassword" end>
            <span style={{color: "white"}}>
                Забыли пароль?
            </span>
        </NavLink>

    </>
}