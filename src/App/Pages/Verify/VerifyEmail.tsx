import {useSearchParams} from "react-router";
import {useVerifyEmail} from "../../../tools/hooks/queries/Verify.queries.ts";
import {SendVerifyEmailButton} from "../../UiElements/Buttons/SendVerifyEmail.button.tsx";
import {useGetMe} from "../../../tools/hooks/queries/User.queries.ts";
import {useCheckToken} from "../../../tools/hooks/queries/Token.queries.ts";

export const VerifyEmail = () => {
    const {data: infoUser, isLoading: isLoadingUser} = useGetMe()
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const {isError: isErrorToken, error: errorToken} = useCheckToken(token)
    const {isLoading: isLoadingVerify, isSuccess, isError, error} = useVerifyEmail(token)

    //TODO проверить не протух ли токен

    if (isErrorToken) return (<div>{errorToken.message}</div>)
    if (isLoadingUser) return (<div>Loading...</div>)
    if (infoUser) {
        if (infoUser.emailVerifiedAt) {
            return (<div>Ваша почта уже верифицирована</div>)
        }

        if (token) {
            if (isLoadingVerify) return (<div>Происходит верификация почты</div>)
            if (isSuccess) return (<div>Почта успешно верифицирована</div>)
            if (isError) return (<>
                <div>Какая-то ошибка, {error.message}</div>
                <SendVerifyEmailButton/>
            </>)
            return (<div>VerifyEmail</div>)
        } else {
            return (<div>А токен то где? Без токена не будет верификации</div>)
        }
    }

}