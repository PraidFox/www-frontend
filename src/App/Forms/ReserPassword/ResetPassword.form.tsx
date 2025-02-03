import {Button, Form, FormProps, Input} from "antd";
import {IFieldResetPassword} from "../../../tools/interfaces/fieldsForForms.interface.ts";
import {NF_ResetPassword} from "../../../tools/storage/FieldName.storage.ts";
import {useSendMailResetPassword} from "../../../tools/hooks/queries/Auth.queries.ts";

export const ResetPasswordForm = () => {
    const sendMailResetPassword = useSendMailResetPassword()

    const onFinish: FormProps<IFieldResetPassword>['onFinish'] = async (values) => {
        await sendMailResetPassword.mutateAsync(values.emailOrLogin)
    };


    return (
        <Form
            name="resetPassword"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 600}}
            initialValues={{remember: true}}
            onFinish={onFinish}
            autoComplete="off"
            scrollToFirstError
        >
            {sendMailResetPassword.isError && <div style={{color: 'red'}}>{sendMailResetPassword.error.message}</div>}
            {sendMailResetPassword.isSuccess &&
                <div style={{color: 'green'}}>Письмо для подтверждения сброса пароля отправлено</div>}

            <Form.Item<IFieldResetPassword>
                label="Логин или email"
                name={NF_ResetPassword.emailOrLogin}
                rules={[{required: true, message: 'Пожалуйста введите логин'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit" loading={sendMailResetPassword.isPending}>
                    Сбросить пароль
                </Button>
            </Form.Item>
        </Form>
    )
}