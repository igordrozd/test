import React from 'react';
import {Form, Button, Input, Card} from 'antd';
import { Link } from "react-router-dom";
import { useStore } from "../../App";
import { login } from '../../api/login';

import styles from './Login.module.css';

const registerLink = (
    <Link to="/register">
        Регистрация
    </Link>
)

export const Login = () => {
    const { authorize } = useStore();
    async function onFinish(values) {
        const response = await login(values);
        const { token } = await response.json();
        localStorage.setItem('auth_token', token);
        await authorize();
    }
    return(
        <div className="center">
            <Card
                title="Вход"
                extra={registerLink}
                style={{ width: 300 }}
            >
                <Form
                    onFinish={onFinish}
                    name="basic"
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder='Введите логин'/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder='Введите пароль' />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.submit}>
                        Войти
                    </Button>
                </Form>
            </Card>
        </div>
    );
}
