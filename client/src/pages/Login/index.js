import React from 'react';
import { Form, Button, Input } from 'antd';
import styles from './Login.module.css';
import { Link } from "react-router-dom";
import { login } from '../../api/login';


export const Login = () => {
    async function onFinish(values) {
        const response = await login(values);
        const { token } = await response.json();
        localStorage.setItem('auth_token', token);
    }    
    return(
        <div className='border'>
        <h2>
          Вход
        </h2>
        <div className={styles.wrapper}>
            <Form
                onFinish={onFinish}
                name="basic"
                autoComplete="off"
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

                <Link to="/">home</Link>

            </Form>
            
        </div>
      </div>
    );
}
