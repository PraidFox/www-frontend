import {Button, Form, Input, Select} from "antd";
import {useGetAllLocations} from "../../../tools/hooks/queries/Location.queries.ts";
import {useForm} from "antd/es/form/Form";
import {IOptLocation} from "../../../tools/interfaces/option.interface.ts";
import {useState} from "react";

export const CreateRoomFrom = () => {
    const {data: locations} = useGetAllLocations()
    const [inputLocation, setInputLocation] = useState<string>()
    const [selectedLocations, setSelectedLocations] = useState<IOptLocation[]>([])
    const [newLocations, setNewLocations] = useState<string[]>([])
    const [form] = useForm()

    console.log("newLocations", newLocations)

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

        <Form.Item
            label="Куда"
            name="location"
        >
            <Select<string, IOptLocation>
                showSearch
                options={locations?.map(location => ({
                    value: location.id.toString(),
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


        <Button type="primary" htmlType="submit">
            Создать
        </Button>
    </Form>
}