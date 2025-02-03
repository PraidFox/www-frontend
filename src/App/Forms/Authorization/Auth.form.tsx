import type {FormProps} from 'antd';
import {Button, Form} from 'antd';
import {useAuth} from "../../../tools/hooks/queries/Auth.queries.ts";
import {IAuth} from "../../../tools/interfaces/auth.interface.ts";
import {IFieldAuth} from "../../../tools/interfaces/fieldsForForms.interface.ts";
import {FieldsAuthorization} from "./Fields.authorization.tsx";


export const AuthorizationForm = () => {
    const auth = useAuth()

    const onFinish: FormProps<IFieldAuth>['onFinish'] = async (values) => {
        const data: IAuth = {
            emailOrLogin: values.emailOrLogin,
            password: values.password,
        }
        await auth.mutateAsync({auth: data, rememberMe: values.remember})
    };
    
    return (
        <>
            {auth.isError && <div>Какая-то ошибка</div>}
            {auth.isSuccess && <div>Всё прошло хорошо</div>}
            <Form
                name="auth"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                autoComplete="off"
                scrollToFirstError
            >

                <FieldsAuthorization/>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
