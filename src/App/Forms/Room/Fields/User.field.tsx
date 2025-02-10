import {Form, Select} from "antd";
import {IOptUser} from "../../../../tools/interfaces/option.interface.ts";
import {useGetAllUsers} from "../../../../tools/hooks/queries/User.queries.ts";
import {NF_CreateRoom} from "../../../../tools/storage/FieldName.storage.ts";

export const UserField = () => {
    const {data: usersAndCount} = useGetAllUsers()

    return <Form.Item
        label="Кто"
        name={NF_CreateRoom.members}
    >
        <Select<string, IOptUser>
            mode={"multiple"}
            showSearch
            options={usersAndCount?.users.map(user => ({
                value: user.id,
                label: user.login,
            }))}
            optionFilterProp="label"
            notFoundContent={<div style={{color: "black"}}>Таково пользователя нет у вас в друзьях.</div>}

        />
    </Form.Item>
}