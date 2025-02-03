import {useCheckToken} from "../../../tools/hooks/queries/Token.queries.ts";
import {Button, Form, FormProps, Input} from "antd";
import {IFieldResetChangePassword} from "../../../tools/interfaces/fieldsForForms.interface.ts";
import {useResetPassword} from "../../../tools/hooks/queries/Auth.queries.ts";
import {NF_ResetChangePassword} from "../../../tools/storage/FieldName.storage.ts";
import {validatePasswordRepeat} from "../Registration/registration.helper.ts";

export const ChangeResetPasswordForm = ({token}: { token: string }) => {

    const {isError, error} = useCheckToken(token)
    const resetPassword = useResetPassword()
    const [form] = Form.useForm<IFieldResetChangePassword>();

    if (isError) return (<div>{error.message}</div>)

    const onFinish: FormProps<IFieldResetChangePassword>['onFinish'] = async (values) => {
        const data = {
            password: values.password,
            passwordRepeat: values.passwordRepeat,
            token: token
        }

        await resetPassword.mutateAsync(data)
    };


    return (
        <>
            <Form
                name="changeResetPassword"
                form={form}
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                autoComplete="off"
                scrollToFirstError
            >
                <Form.Item<IFieldResetChangePassword>
                    label="Пароль"
                    name={NF_ResetChangePassword.password}
                    rules={[{required: true, message: 'Пожалуйста введите пароль'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item<IFieldResetChangePassword>
                    label="Повторить пароль"
                    name={NF_ResetChangePassword.passwordRepeat}
                    dependencies={[NF_ResetChangePassword.password]}
                    rules={[{required: true, message: 'Пожалуйста повторите пароль'},
                        {validator: (_, value) => validatePasswordRepeat(_, value, form.getFieldValue(NF_ResetChangePassword.password))}]}
                >
                    <Input.Password
                        type="password"
                    />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Подтвердить изменение пароля
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}