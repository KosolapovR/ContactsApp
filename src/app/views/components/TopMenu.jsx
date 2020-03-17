import React from 'react';
import {PageHeader, Button} from 'antd';
import {UserOutlined} from "@ant-design/icons";
import '../pages/home.css';

const TopMenu = ({userName}) => {

    const handleAddContact = () => {

    }

    return (
        < PageHeader
            title="Личный кабинет"
            extra={
                [
                    <Button onClick={handleAddContact} key="1" type="primary">
                        Добавить контакт
                    </Button>,
                    <span>
                        <UserOutlined/>
                        {userName}
                    </span>

                ]
            }
        >
        </PageHeader>
    );
}

export default TopMenu;