import {useGetMe} from "../../tools/hooks/queries/User.queries.ts";
import {MainMenu} from "./MainMenu.tsx";
import {LogoBig} from "../UiElements/Logo/LogoBig.tsx";
import {ContentPage} from "./Content.page.tsx";

export const Skeleton = () => {

    const {isLoading} = useGetMe()

    return (<>
            <LogoBig/>
            {!isLoading && <MainMenu/>}
            <br/>
            <ContentPage/>
        </>
    );
};

