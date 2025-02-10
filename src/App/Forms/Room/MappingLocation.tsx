import {IOptLocation} from "../../../tools/interfaces/option.interface.ts";
import {Button, DatePicker, Form, FormInstance, Input} from "antd";
import {useState} from "react";
import {useGetAllLocations} from "../../../tools/hooks/queries/Location.queries.ts";
import {LocationField} from "./Fields/Location.field.tsx";
import {optionsDateTypeType} from "../../../tools/constant/options.constant.ts";

export const MappingLocation = ({form, dateType}: { form: FormInstance, dateType: optionsDateTypeType }) => {
    const {data: locations} = useGetAllLocations()

    const [inputLocation, setInputLocation] = useState<string>()
    const [selectedLocations, setSelectedLocations] = useState<IOptLocation[]>([])
    const [newLocations, setNewLocations] = useState<string[]>([])


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
    return <>
        <LocationField
            options={locations}
            setInputLocation={setInputLocation}
            changeLocations={changeLocations}
            addNewLocation={addNewLocation}
            inputLocation={inputLocation}
        />

        <ul>
            {selectedLocations?.map((location: IOptLocation, index: number) => <li
                key={location.value + index.toString()}>
                <>
                    Наименование: {location.label} <Button
                    onClick={() => deleteSelectedLocation(location.value)}>Удалить</Button>
                    Адресс: {location.info?.address}
                    Ссылка: {location.info?.url}
                    {dateType === 'date_for_every_location' &&
                        <Form.Item name="date-time-picker" label="Когда">
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                        </Form.Item>
                    }
                    <Form.Item label="Дополнительная информация" name={"location_info" + index.toString()}>
                        <Input.TextArea/>
                    </Form.Item>

                </>
            </li>)}
            {newLocations?.map((location: string, index: number) => <li key={location + index.toString()}>
                <Form.Item label="Наименование" name={"new_location_name" + index.toString()} initialValue={location}>
                    <Input/>
                </Form.Item>
                <Button onClick={() => deleteNewLocation(location)}>Удалить</Button>
                <Form.Item label="Адресс" name={"new_location_address" + index.toString()}>
                    <Input/>
                </Form.Item>
                {dateType === 'date_for_every_location' &&
                    <Form.Item name="date-time-picker" label="Когда">
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                    </Form.Item>
                }
                <Form.Item label="Ссылка" name={"new_location_url" + index.toString()}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Дополнительная информация" name={"new_location_info" + index.toString()}>
                    <Input.TextArea/>
                </Form.Item>

            </li>)}
        </ul>
    </>
}