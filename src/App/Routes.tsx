import {Route, Routes} from "react-router";
import {AuthLayout} from "./Pages/Auth/AuthLayout.tsx";
import {Login} from "./Pages/Auth/Login.tsx";
import {Register} from "./Pages/Auth/Register.tsx";
import {Welcome} from "./Pages/Welcome/Welcome.page.tsx";
import {VerifyEmail} from "./Pages/Verify/VerifyEmail.tsx";
import {ProfilePage} from "./Pages/Profile/Profile.page.tsx";
import {ChangePassword} from "./Pages/Profile/ChangePasswor.tsx";
import {ResetPassword} from "./Pages/Auth/ResetPassword.tsx";
import {Skeleton} from "./Skeleton/Skeleton.tsx";
import {AboutProject} from "./Pages/Welcome/AboutProject.page.tsx";
import {RedirectToHomeRoute} from "./UiElements/RedirectToHomeRoute.tsx";
import {ErrorPage} from "./Pages/Error/Error.page.tsx";
import {RoomsPage} from "./Pages/Rooms/Rooms.page.tsx";
import {CreateRoomFrom} from "./Forms/Room/CreateRoom.form.tsx";

// const RoomsRoutes = () => {
//     return (
//         <Routes>
//             <Route path="/" element={<RoomsPage/>}/>
//             <Route path="create" element={<CreateRoomFrom/>}/>
//         </Routes>
//     );
// };


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Skeleton/>}>
                <Route path={'aboutProject'} element={<AboutProject/>}/>
                <Route element={<RedirectToHomeRoute><AuthLayout/></RedirectToHomeRoute>}>
                    <Route path="login" element={<Login/>}/>
                    <Route path="resetPassword" element={<ResetPassword/>}/>
                    <Route path="register" element={<Register/>}/>
                </Route>
                <Route path={'welcome'} element={<Welcome/>}/>
                <Route path={'verifyEmail'} element={<VerifyEmail/>}/>
                <Route path={'profile'}>
                    <Route path=":userName" element={<ProfilePage/>}>
                        <Route path="changePassword" element={<ChangePassword/>}/>
                    </Route>
                </Route>

                {/*<Route path="rooms/*" element={<RoomsRoutes />} />*/}
                <Route path={'rooms'} element={<RoomsPage/>}/>
                <Route path={'rooms/create'} element={<CreateRoomFrom/>}/>


                <Route path="*" element={<ErrorPage/>}/>
            </Route>
        </Routes>
    )
}