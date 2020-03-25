import React from 'react';
import {Menu} from 'antd';

function LeftMenu(props) {
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="mail">
                <a href="/">홈</a>
            </Menu.Item>
            <Menu.Item key="follow">
                <a href="/follow">팔로잉</a>
            </Menu.Item>

        </Menu>
    )
}

export default LeftMenu