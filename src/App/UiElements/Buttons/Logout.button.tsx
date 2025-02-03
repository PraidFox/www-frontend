import {Button} from "antd";
import {useLogout} from "../../../tools/hooks/queries/Auth.queries.ts";

export const LogoutButton = () => {

    const logout = useLogout()

    const handleLogout = async () => {
        await logout.mutateAsync()
    }

    return (
        <Button onClick={handleLogout}>Выйти</Button>
    )
}