import {Button, Checkbox, DatePicker, Form, Input, Radio, Select} from "antd";
import {useGetAllLocations} from "../../../tools/hooks/queries/Location.queries.ts";
import {useForm} from "antd/es/form/Form";
import {IOptLocation, IOptUser} from "../../../tools/interfaces/option.interface.ts";
import {useState} from "react";
import {useGetAllUsers} from "../../../tools/hooks/queries/User.queries.ts";

export const CreateRoomFrom = () => {
    const {data: locations} = useGetAllLocations()
    const {data: usersAndCount} = useGetAllUsers()


    const [inputLocation, setInputLocation] = useState<string>()
    const [selectedLocations, setSelectedLocations] = useState<IOptLocation[]>([])
    const [newLocations, setNewLocations] = useState<string[]>([])
    const [form] = useForm()


    const [typeDate, setTypeDate] = useState()

    const save = (values: any) => {
        console.log("values", values)
    }

    const changeLocations = (value: IOptLocation | IOptLocation[] | undefined) => {
        if (value && !Array.isArray(value)) {
            setSelectedLocations(r => [...r, value])
        }
        form.resetFields(['location'])
    }

    const addNewLocation = () => {
        if (inputLocation) {
            setNewLocations(r => [...r, inputLocation!])
            form.resetFields(['location'])
        }
    }


    const deleteNewLocation = (name: string) => {
        setNewLocations(r => r.filter(x => x !== name))
    }

    //TODO так как можно напикать одной локации несколько раз, то нужно реализовать удаление конкретной, а не всех разом
    const deleteSelectedLocation = (id: string | number | null | undefined) => {
        setSelectedLocations(r => r.filter(x => x.value !== id))
    }

    return <Form
        name={'FormCreateRoom'}
        onFinish={save}
        form={form}
    >
        <Form.Item label="Название комнаты" name="nameRoom"
                   rules={[{required: true, message: 'Необходимо дать название'}]}>
            <Input/>
        </Form.Item>

        <Form.Item label="Описание комнаты" name="descriptionRoom">
            <Input.TextArea/>
        </Form.Item>

        TODO добавить возможно выбора: несколько локаций - одно время / для каждой локации своё время
        <Form.Item
            label="Куда"
            name="location"
        >
            <Select<string, IOptLocation>
                showSearch
                options={locations?.map(location => ({
                    value: location.id,
                    label: location.name,
                    info: {url: location.url, address: location.address}
                }))}
                optionFilterProp="label"
                onSearch={setInputLocation}
                notFoundContent={<div style={{color: "black"}}>Вау! Такой локации в нашем справочники еще
                    нет.<Button onClick={addNewLocation}>Добавить!</Button></div>}
                onChange={(_, option) => changeLocations(option)}
                optionRender={(option) => <div>Наименование: {option.label} <br/> Адресс: {option.data?.info?.address}
                </div>}
            />
        </Form.Item>

        <ul>
            {selectedLocations?.map((location: IOptLocation, index: number) => <li
                key={location.value + index.toString()}>
                <>
                    Наименование: {location.label} <Button
                    onClick={() => deleteSelectedLocation(location.value)}>Удалить</Button>
                    <Form.Item label="Адресс" name={"address" + index.toString()} initialValue={location.info?.address}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Ссылка" name={"url" + index.toString()} initialValue={location.info?.url}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Дополнительная информация" name={"location_info" + index.toString()}>
                        <Input.TextArea/>
                    </Form.Item>

                </>
            </li>)}
            {newLocations?.map((location: string, index: number) => <li key={location + index.toString()}>
                Наименование: {location}
                <Button onClick={() => deleteNewLocation(location)}>Удалить</Button>
                <Form.Item label="Адресс" name={"new_location_address" + index.toString()}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Ссылка" name={"new_location_url" + index.toString()}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Дополнительная информация" name={"new_location_info" + index.toString()}>
                    <Input.TextArea/>
                </Form.Item>

            </li>)}
        </ul>


        <Form.Item
            label="Кто"
            name="members"
        >
            <Select<string, IOptUser>
                mode={"multiple"}
                showSearch
                options={usersAndCount?.users.map(user => ({
                    value: user.id,
                    label: user.login,
                }))}
                optionFilterProp="label"
                onSearch={setInputLocation}
                notFoundContent={<div style={{color: "black"}}>Таково пользователя нет у вас в друзьях.</div>}

            />
        </Form.Item>

        TODO: Странное поведение
        <Form.Item name={typeDate}>
            <Radio.Group onChange={value => setTypeDate(value.target.value)}>
                <Radio value="date_with_time"> Дата (есть время) </Radio>
                <Radio value="date_period" disabled={true}> Период даты для голосования </Radio>
                <Radio value="multiple_dates" disabled={true}> Несколько конкретных дат </Radio>
            </Radio.Group>
        </Form.Item>


        {typeDate === "date_with_time" && <>


            <Form.Item name="date-time-picker" label="Когда">
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
            </Form.Item>


            <Form.Item name="dateCanBeChanged">
                <Checkbox.Group>
                    <Checkbox value="date_can_be_changed" style={{lineHeight: '32px'}}>
                        Время обсуждаемо
                    </Checkbox>
                </Checkbox.Group>
            </Form.Item></>}


        <Button type="primary" htmlType="submit">
            Создать
        </Button>
    </Form>
}