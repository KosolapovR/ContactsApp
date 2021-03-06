import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './login.css';
import {authentication} from "../../state/auth";
import {Redirect} from "react-router";
import {NavLink} from "react-router-dom";

const Login = ({user, authentication, credentialsIsValid}) => {

    const [validateStatus, setValidateStatus] = useState(null);
    const [helpMsg, setHelpMsg] = useState(null);

    useEffect(() => {
        if (credentialsIsValid === false) {
            setValidateStatus('error');
            setHelpMsg('Неправильные логин и/или пароль');
        }
    }, [credentialsIsValid]);

    const onFinish = credentials => {
        authentication(credentials);
    };

    if (user.isAuth) return <Redirect to="/"/>;

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
                validateStatus={validateStatus}
                help={helpMsg}
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
                validateStatus={validateStatus}
                help={helpMsg}
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите Ваш пароль!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Пароль"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Войти
                </Button>
                Или <a href="/"><NavLink to="/registration">зарегистрируйтесь!</NavLink></a>
            </Form.Item>
        </Form>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user,
    credentialsIsValid: state.auth.credentialsIsValid
});

export default connect(mapStateToProps, {authentication})(Login);