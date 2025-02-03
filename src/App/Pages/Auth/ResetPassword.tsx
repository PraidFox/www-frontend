import {ResetPasswordForm} from "../../Forms/ReserPassword/ResetPassword.form.tsx";
import {useSearchParams} from "react-router";
import {ChangeResetPasswordForm} from "../../Forms/ReserPassword/ChangeResetPassword.form.tsx";

export const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');


    if (token) {
        return (
            <ChangeResetPasswordForm token={token}/>
        )
    } else {
        return (
            <ResetPasswordForm/>
        )
    }


}