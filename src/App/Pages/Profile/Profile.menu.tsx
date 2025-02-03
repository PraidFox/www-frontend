import {NavLink} from "react-router";

export const ProfileMenu = ({userName}: { userName: string }) => {
    return (
        <div>
            <nav>
                <NavLink to={`/profile/${userName}/changePassword`} end>
                    Изменение пароля
                </NavLink>
            </nav>
        </div>
    )
}