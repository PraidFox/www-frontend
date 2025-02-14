import {IOptLocation} from "../../../../tools/interfaces/option.interface.ts";
import {Button, FormInstance} from "antd";
import {Dispatch, SetStateAction, useRef, useState} from "react";
import {useGetAllLocations} from "../../../../tools/hooks/queries/Location.queries.ts";
import {LocationField} from "../Fields/Location.field.tsx";
import {DateType} from "../../../../tools/constant/options.constant.ts";
import {ExistingLocation} from "./ExistingLocation.tsx";
import {NewLocation} from "./NewLocation.tsx";
import {RoomLocations} from "../../../../tools/Models/room.dto.ts";

export const MappingLocation = ({
                                    form,
                                    dateType,
                                    setSelectedLocations,
                                    selectedLocations,
                                    setNewLocations,
                                    newLocations,
                                    defaultValues,
                                }: {
    form: FormInstance,
    dateType: DateType,
    setSelectedLocations: Dispatch<SetStateAction<{ index: number, linkId: number, location: IOptLocation }[]>>
    selectedLocations: { index: number, location: IOptLocation }[],
    setNewLocations: Dispatch<SetStateAction<{ index: number, location: string }[]>>
    newLocations: { index: number, location: string }[]
    defaultValues?: RoomLocations[]
}) => {
    const {data: locations} = useGetAllLocations()

    const indexLocations = useRef(1);

    const [inputLocation, setInputLocation] = useState<string>()

    const changeLocations = (value: IOptLocation | IOptLocation[] | undefined) => {
        if (value && !Array.isArray(value)) {
            setSelectedLocations(r => [...r, {
                linkId: 0,
                index: indexLocations.current,
                location: value
            }])
            indexLocations.current++
        }
        form.resetFields(['location'])
    }


    const addNewLocation = () => {
        if (inputLocation) {
            setNewLocations(r => [...r, {
                index: indexLocations.current,
                location: inputLocation
            }])
            form.resetFields(['location'])
        }
    }

    const deleteNewLocation = (index: number) => {
        setNewLocations(r => r.filter(x => x.index !== index))
    }

    const deleteSelectedLocation = (index: string | number | null | undefined) => {
        setSelectedLocations(r => r.filter(x => x.index !== index))
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
            {selectedLocations?.map((selected: { index: number, location: IOptLocation }) =>
                <li key={selected.location.value + selected.index.toString()}>
                    <Button onClick={() => deleteSelectedLocation(selected.index)}>Удалить</Button>
                    <br/>
                    <ExistingLocation selected={selected} dateType={dateType}
                                      defaultValues={defaultValues?.find(detail => detail.location.id == selected.location.value)}/>
                </li>
            )}


            {newLocations?.map((selected: { index: number, location: string }) =>
                <li key={selected.location + selected.index.toString()}>
                    <Button onClick={() => deleteNewLocation(selected.index)}>Удалить</Button>
                    <br/>
                    <NewLocation selected={selected} dateType={dateType}/>
                </li>
            )}
        </ul>
    </>
}