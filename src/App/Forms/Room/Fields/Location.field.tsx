import {Button, Divider, Flex, Form, Select} from "antd";
import {IOptLocation} from "../../../../tools/interfaces/option.interface.ts";
import {LocationDTO} from "../../../../tools/Models/location.dto.ts";

export const LocationField = ({options, setInputLocation, changeLocations, addNewLocation, inputLocation}: {
    options?: LocationDTO[],
    setInputLocation: (value: string) => void,
    changeLocations: (value: IOptLocation | IOptLocation[] | undefined) => void,
    addNewLocation: () => void
    inputLocation?: string
}) => {

    return <Form.Item
        label="Куда"
        name="location"
    >
        <Select<string, IOptLocation>
            showSearch
            dropdownRender={menu => (
                <>
                    {menu}
                    {inputLocation && <>
                        <Divider style={{margin: '8px 0'}}/>

                        <Flex align={"center"}>
                            <Button type="primary" onClick={addNewLocation}>
                                Не нашел в списке
                            </Button>
                        </Flex>
                    </>}

                </>
            )}
            options={options?.map(location => ({
                value: location.id,
                label: location.name,
                info: {url: location.url, address: location.address}
            }))}
            optionFilterProp="label"
            onSearch={setInputLocation}
            notFoundContent={<div style={{color: "black"}}>Вау! Такой локации в нашем справочники еще
                нет.</div>}
            onChange={(_, option) => changeLocations(option)}
            optionRender={(option) => <div>Наименование: {option.label} <br/> Адресс: {option.data?.info?.address}
            </div>}
        />
    </Form.Item>
}