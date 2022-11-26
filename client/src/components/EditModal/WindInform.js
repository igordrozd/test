import React  from "react";
import { Form, Input, TimePicker } from 'antd';
import dayjs from 'dayjs';

const defaultValue = dayjs('00:00', 'HH:mm')
export const WindInform = () => (
    <>
        <Form.Item name="title" 
                // rules={[{ required: true, message: 'Пожалуйста, введите информацию!' }]}
                >
            <Input placeholder='Введите информацию'/>
        </Form.Item>
        <Form.Item name="time">
            <TimePicker
                format="HH:mm"
                defaultOpenValue={defaultValue}
                style={{ width: `100%` }}
                defaultValue={defaultValue}
            />
        </Form.Item>
    </>
)