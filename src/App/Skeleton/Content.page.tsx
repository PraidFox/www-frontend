import {Outlet} from "react-router";
import {Layout} from "antd";

const {Content} = Layout;

export const ContentPage = () => {
    return (
        <Content style={{padding: '0 20px'}}>
            <div
                style={{
                    // background: "gray",
                    minHeight: 280,
                    padding: 24,
                    borderRadius: 10,
                    border: "1px solid black",
                }}
            >
                <Outlet/>
            </div>
        </Content>
    )
}


