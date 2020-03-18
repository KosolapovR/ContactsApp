import React from 'react';
import {PageHeader, Button, Popover, Tooltip, Row, Col} from 'antd';
import '../pages/home.css';
import LogoutOutlined from "@ant-design/icons/lib/icons/LogoutOutlined";
import {connect} from "react-redux";
import {logout} from "../../state/auth";

const TopMenu = ({userName, logout}) => {

    const handleAddContact = () => {

    }

    return (
        < Row justify="space-beetwen">
            <Col flex="auto"><h1>Личный кабинет</h1></Col>
            <Col flex="100px" style={{textAlign: "right"}}>
                    <span style={{marginRight: '10px'}}>
                        {userName}
                    </span>
                <Tooltip title="Выход">
                    <LogoutOutlined onClick={() => {
                        logout()
                    }}/>
                </Tooltip>

            </Col>
        </Row>
    );
}


export default connect(null, {logout})(TopMenu);