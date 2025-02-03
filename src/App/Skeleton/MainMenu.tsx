import {NavLink} from "react-router"
import {useGetMe} from "../../tools/hooks/queries/User.queries.ts";
import {LogoutButton} from "../UiElements/Buttons/Logout.button.tsx";
import {Card, Flex} from "antd";

export const MainMenu = () => {
    const {data: infoUser} = useGetMe()

    return (
        <Flex>
            <NavLink to="/aboutProject" end>
                <Card style={{width: 200, height: 100}}>
                    О проекте
                </Card>
            </NavLink>
            {!infoUser && <NavLink to="/login" end>
                <Card style={{width: 200, height: 100}}>
                    Логин
                </Card>
            </NavLink>}
            {!infoUser && <NavLink to="/register" end>
                <Card style={{width: 200, height: 100}}>
                    Регистрация
                </Card>
            </NavLink>}

            {infoUser
                && <NavLink to={`/profile/${infoUser.login}`} end>
                    <Card style={{width: 200, height: 100}}>
                        Профиль
                    </Card>
                </NavLink>}

            <NavLink to="/rooms" end>
                <Card style={{width: 200, height: 100}}>
                    Комнаты
                </Card>
            </NavLink>

            {infoUser &&
                <Card style={{width: 200, height: 100}}>
                    <LogoutButton/>
                </Card>}


        </Flex>
    )
}