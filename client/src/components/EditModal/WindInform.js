import React  from "react";
import { Form, Input } from 'antd';

export const WindInform = () => (
    <>
        <Form.Item name="title">
            <Input placeholder='Введите название'/>
        </Form.Item>
        <Form.Item name="start">
            <Input placeholder='Информация' />
        </Form.Item>
    </>
)