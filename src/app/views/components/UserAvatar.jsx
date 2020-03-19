import React from "react";
import "antd/dist/antd.css";
import {Avatar, Col, Row} from "antd";

const UserAvatar = ({contacts}) => {
    let userName;
    if (contacts.name) {
        userName = contacts.name[0];
    } else {
        userName = '?';
    }

    const d2h = (d) => {
        return d.toString(16);
    };

    const stringToHex = (tmp) => {
        let str = '',
            i = 0,
            tmp_len = tmp.length,
            c;

        for (; i < tmp_len; i += 1) {
            c = tmp.charCodeAt(i);
            str += d2h(c) + ' ';
        }
        return "#" + str;
    };

    return (
        <Row justify="center" style={{width: '100%'}}>
            <Col style={{width: "auto", textAlign: 'center'}}>
                <Avatar
                    style={{backgroundColor: stringToHex(userName), verticalAlign: "middle"}}
                    size="large"
                >
                    {userName}
                </Avatar>
            </Col>
        </Row>
    );
};

export default UserAvatar;