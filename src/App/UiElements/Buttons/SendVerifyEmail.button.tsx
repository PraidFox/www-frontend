import {Button} from "antd";
import {useSendVerifyEmail} from "../../../tools/hooks/queries/Verify.queries.ts";

export const SendVerifyEmailButton = () => {
    const sendVerifyEmail = useSendVerifyEmail()

    const handleSendVerifyEmail = async () => {
        await sendVerifyEmail.mutateAsync()
    }

    return (
        <Button onClick={handleSendVerifyEmail}>
            Повторно направить письмо для верификации почты
        </Button>
    )
}