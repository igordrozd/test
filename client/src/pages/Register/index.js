import React from 'react';
import { Link } from "react-router-dom";
import { Form, Button, Input } from 'antd';
import styles from './Register.module.css';
import sendRequest from '../../utils/request';

export const Register = () => {
    const onSubmit = async (values) => {
        const response = await sendRequest(`http://localhost:8000/api/users`, 'POST', values);
        const { token } = await response.json();
        localStorage.setItem('auth_token', token);
    }
    return(
        <div className='border'>
        <h2>
          Регистрация
        </h2>
        <div className={styles.wrapper}>
            <Form
                name="basic"
                autoComplete="off"
                onFinish={onSubmit}
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
                    Зарегистрироваться
                </Button>

                <Link to="/">home</Link>

            </Form>
            
        </div>
      </div>
    );
}
