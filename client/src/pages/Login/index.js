import React from 'react';
import { Form, Button, Input } from 'antd';
import styles from './Login.module.css';
import { Link } from "react-router-dom";


export const Login = () => {
    const onFinish = async (values) => {
        // const response = await fetch(`http://localhost:8000/api/users`, args);
        // const { token } = await response.json();
        // console.log('Success:', values);
      };
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
                    name="username"
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

                <Link to="/documents">
                    <Button type="primary" htmlType="submit" className={styles.submit}>
                        Войти
                    </Button>
                </Link>

                <Link to="/">home</Link>

            </Form>
            
        </div>
      </div>
    );
}
