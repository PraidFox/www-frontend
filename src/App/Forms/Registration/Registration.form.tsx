import {Button, Form, FormProps} from 'antd';
import {IFieldRegistration} from "../../../tools/interfaces/fieldsForForms.interface.ts";
import {FieldsRegistration} from "./Fields.registration.tsx";
import {useRegistration} from "../../../tools/hooks/queries/Auth.queries.ts";
import {RegisterDto} from "../../../tools/Models/auth.dto.ts";
import {NF_Registration} from "../../../tools/storage/FieldName.storage.ts";


export const RegistrationForm = () => {
    const registration = useRegistration()

    const onFinish: FormProps<IFieldRegistration>['onFinish'] = async (values) => {

        const data: RegisterDto = {
            email: values[NF_Registration.EMAIL],
            login: values[NF_Registration.login],
            password: values[NF_Registration.password],
            passwordRepeat: values[NF_Registration.passwordRepeat]
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
