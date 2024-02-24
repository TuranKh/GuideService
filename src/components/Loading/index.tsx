import { Spin } from "antd";
import "./Loading.scss";

export const Loading = function () {
    return (
        <div className='loading-wrapper'>
            <Spin size='large'></Spin>
        </div>
    );
};
