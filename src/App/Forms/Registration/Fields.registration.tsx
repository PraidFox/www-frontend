import {Form, FormInstance, Input} from "antd";
import {validatePasswordRepeat} from "./registration.helper.ts";
import {IFieldRegistration} from "../../../tools/interfaces/fieldsForForms.interface.ts";
import {NF_Registration} from "../../../tools/storage/FieldName.storage.ts";

export const FieldsRegistration = ({form}: { form: FormInstance<IFieldRegistration> }) => {
    return (
        <>
            <Form.Item<IFieldRegistration>
                label="email"
                name={NF_Registration.EMAIL}
                rules={[
                    {
                        type: 'email', message: 'Формат почты не верен',
                    }, {
                        required: true, message: 'Пожалуйста введите почту'
                    }
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<IFieldRegistration>
                label="Логин"
                name={NF_Registration.login}
                rules={[{required: true, message: 'Пожалуйста введите логин'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<IFieldRegistration>
                label="Пароль"
                name={NF_Registration.password}
                rules={[{required: true, message: 'Пожалуйста введите пароль'}]}
                //initialValue={"12345678"}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item<IFieldRegistration>
                label="Повторить пароль"
                name={NF_Registration.passwordRepeat}
                dependencies={[NF_Registration.password]}
                rules={[{required: true, message: 'Пожалуйста повторите пароль'},
                    {validator: (_, value) => validatePasswordRepeat(_, value, form.getFieldValue(NF_Registration.password))}]}
            >
                <Input.Password
                    type="password"
                />
            </Form.Item>
        </>
    )
}