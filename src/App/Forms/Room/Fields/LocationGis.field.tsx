import {Form, Select, Spin} from "antd";
import {useGetLocationsGit} from "../../../../tools/hooks/queries/Gis.queries.ts";
import {useState} from "react";
import {useDebounce} from "../../../../tools/hooks/useDebounce.ts";

export const LocationGisField = () => {
    const [valueField, setValueField] = useState<string>()
    const setInputLocation = useDebounce(setValueField, 1000)
    const {data, isFetching} = useGetLocationsGit(valueField ? {
        cityId: 4926434862694425,
        query: valueField
    } : undefined)


    console.log("DATA", data)

    return <Form.Item
        label="Куда 2Gis"
        name="location"
    >
        <Select
            showSearch
            filterOption={false}
            onSearch={e => setInputLocation(e)}
            options={data?.result.items.map(location => ({
                value: location.id,
                label: location.name,
                //info: {address: location.address_comment}
            }))}
            notFoundContent={isFetching ? <Spin size="small"/> : null}
        />
    </Form.Item>
}