import {useGetMe} from "../../tools/hooks/queries/User.queries.ts";
import {MainMenu} from "./MainMenu.tsx";
import {LogoBig} from "../UiElements/Logo/LogoBig.tsx";
import {ContentPage} from "./Content.page.tsx";
import {useLayoutEffect} from "react";

export const Skeleton = () => {

    const {isLoading} = useGetMe()
    useLayoutEffect(() => {
        //GisService.getGis()
    }, []);

    return (<>
            <LogoBig/>
            {!isLoading && <MainMenu/>}
            <br/>
            <ContentPage/>
        </>
    );
};

