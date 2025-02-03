import {Outlet, useParams} from "react-router";
import {useGetMySession, useUser} from "../../../tools/hooks/queries/User.queries.ts";
import {ProfileMenu} from "./Profile.menu.tsx";
import {SendVerifyEmailButton} from "../../UiElements/Buttons/SendVerifyEmail.button.tsx";

export const ProfilePage = () => {
    const {userName} = useParams();
    const {data: userInfo, isLoading} = useUser(userName)
    const {data: session} = useGetMySession()
    console.log("session", session)

    if (isLoading) return (<div>Loading...</div>)
    if (!userInfo || !session) return (<div>Пользователь не найден</div>)
    return (<>
            <div>ProfilePage</div>
            <div>Привет {userInfo.login}</div>
            {userInfo.emailVerifiedAt ? (<div>Почта верифицирована</div>) : (
                <div>Почта не верифицирована <SendVerifyEmailButton/></div>)}
            <ul>
                {session.sessions.map(x => <li key={x.id}>{x.sessionMetadata}</li>)}
            </ul>
            <ProfileMenu userName={userInfo.login}/>
            <Outlet/>
        </>

    )
}