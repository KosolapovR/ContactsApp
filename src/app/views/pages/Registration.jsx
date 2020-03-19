import React, {useState} from 'react';
import {Redirect} from "react-router";
import {Button, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
import {registration} from "../../state/auth";
import {NavLink} from "react-router-dom";

const Registration = ({user, registration}) => {
    const [registered, setRegistered] = useState(false);
    const onFinish = credentials => {
        registration(credentials);
        setRegistered(true);
    };

    if (registered) return <Redirect to="/"/>;

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите Ваше имя!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Имя"/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите Ваш пароль!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    placeholder="Пароль"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Регистрация
                </Button>
                <a><NavLink to="/">Вернуться на страницу входа!</NavLink></a>
            </Form.Item>
        </Form>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, {registration})(Registration);