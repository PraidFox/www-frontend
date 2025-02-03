import type {FormProps} from 'antd';
import {Button, Form} from 'antd';
import {IFieldRegistration} from "../../../tools/interfaces/fieldsForForms.interface.ts";
import {FieldsRegistration} from "./Fields.registration.tsx";
import {useRegistration} from "../../../tools/hooks/queries/Auth.queries.ts";
import {IRegistration} from "../../../tools/interfaces/auth.interface.ts";


export const RegistrationForm = () => {
    const registration = useRegistration()

    const onFinish: FormProps<IFieldRegistration>['onFinish'] = async (values) => {

        const data: IRegistration = {
            email: values.email,
            login: values.login,
            password: values.password,
            passwordRepeat: values.passwordRepeat
        }

        //TODO определиться как показывать/возвращать ошибки которые отдаёт бекенд. К примеру в этом случае, что пароль должен быть больше 6 символов
        await registration.mutateAsync(data)
    };
    const [form] = Form.useForm<IFieldRegistration>();


    return (
        <>
            <Form
                name="registration"
                form={form}
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                autoComplete="off"
                scrollToFirstError
            >
                <FieldsRegistration form={form}/>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Зарегестрироваться
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
