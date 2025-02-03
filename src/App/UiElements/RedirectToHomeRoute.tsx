import {Navigate} from "react-router";
import {useGetMe} from "../../tools/hooks/queries/User.queries.ts";
import {ReactNode} from "react";


export const RedirectToHomeRoute = ({children}: { children: ReactNode }) => {
    const {data: isAuthenticated, isLoading} = useGetMe()
    if (isLoading) return <div>Loading...</div>
    return isAuthenticated ? <Navigate to="/"/> : children;
};