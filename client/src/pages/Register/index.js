import React from 'react';
import { Link } from "react-router-dom";
import {Form, Button, Input, Card} from 'antd';
import { useStore } from "../../App";
import { register } from '../../api/register';

import styles from './Register.module.css';

const loginLink = (
    <Link to="/login">
        Вход
    </Link>
)

export const Register = () => {
    const { authorize } = useStore();
    const onSubmit = async (values) => {
        const response = await register(values);
        const { token } = await response.json();
        localStorage.setItem('auth_token', token);
        await authorize();
    }
    return(
        <div className="center">
            <Card
                title="Регистрация"
                extra={loginLink}
                style={{ width: 300 }}
            >
                <Form
                    name="basic"
                    autoComplete="off"
                    onFinish={onSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!'
                            }
                        ]}
                    >
                        <Input placeholder='Введите ФИО сотрудника'/>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!'
                            }
                        ]}
                    >
                        <Input placeholder='Введите логин'/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!'
                            }
                         ]}
                    >
                        <Input.Password placeholder='Введите пароль' />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.submit}>
                        Зарегистрироваться
                    </Button>
                </Form>
            </Card>
        </div>
    );
}
