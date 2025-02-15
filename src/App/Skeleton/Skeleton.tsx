import {useGetMe} from "../../tools/hooks/queries/User.queries.ts";
import {MainMenu} from "./MainMenu.tsx";
import {LogoBig} from "../UiElements/Logo/LogoBig.tsx";
import {ContentPage} from "./Content.page.tsx";
import {LocationGisField} from "../Forms/Room/Fields/LocationGis.field.tsx";


export const Skeleton = () => {


    const {isLoading} = useGetMe()


    return (<>
            <LogoBig/>
            <LocationGisField/>
            {!isLoading && <MainMenu/>}
            <br/>
            <ContentPage/>
        </>
    );
};

