import {Button, DatePicker, Form} from "antd";
import {useForm} from "antd/es/form/Form";
import {NameRoomField} from "./Fields/NameRoom.field.tsx";
import {MappingLocation} from "./MappingLocation.tsx";
import {UserField} from "./Fields/User.field.tsx";
import {DateTypeField} from "./Fields/DateType.field.tsx";
import {optionsDateTypeType} from "../../../tools/constant/options.constant.ts";

export const CreateRoomFrom = () => {


    const [form] = useForm()
    const typeDateValue: optionsDateTypeType = Form.useWatch('typeDate', form);


    const save = (values: any) => {
        console.log("values", values)
    }


    return <Form
        name={'FormCreateRoom'}
        onFinish={save}
        form={form}
    >

        <NameRoomField/>
        <UserField/>
        <DateTypeField/>
        {typeDateValue === 'date_all_location' &&
            <Form.Item name="date-time-picker" label="Когда">
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
            </Form.Item>
        }
        <MappingLocation form={form} dateType={typeDateValue}/>


        <Button type="primary" htmlType="submit">
            Создать
        </Button>
    </Form>
}