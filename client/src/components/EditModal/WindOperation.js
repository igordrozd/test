import React from "react";
import { Form, Input } from 'antd';

export const WindOperation = () => (
    <>
        <Form.Item name="title">
            <Input placeholder='Введите название'/>
        </Form.Item>
        <Form.Item name="start">
            <Input placeholder='Время начала' />
        </Form.Item>
        <Form.Item name="end">
            <Input placeholder='Время окончания' />
        </Form.Item>
    </>
)