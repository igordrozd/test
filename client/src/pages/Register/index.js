import React from 'react';
import { Form, Button, Input } from 'antd';
import styles from './Register.module.css';
import { Link } from "react-router-dom";


export const Register = () => {
    return(
        <div className='border'>
        <h2>
          Регистрация
        </h2>
        <div className={styles.wrapper}>
            <Form
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

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please repeat your password!' }]}
                >
                    <Input placeholder='Повторите пароль'/>
                </Form.Item>
                
                <Button type="primary" htmlType="submit" className={styles.submit}>
                    Зарегистрироваться
                </Button><Link to="/">home</Link>
            </Form>
            
        </div>
      </div>
    );
}
