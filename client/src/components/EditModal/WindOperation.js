import React from "react";
import { Form, Input, TimePicker } from 'antd';
import dayjs from 'dayjs';

const defaultValue = dayjs('00:00', 'HH:mm')
export const WindOperation = () => (
    <>
        <Form.Item name="title"
                // rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}
                >
            <Input placeholder='Введите название'/>
        </Form.Item>
        <Form.Item name="time">
            <TimePicker.RangePicker  
                format="HH:mm"
                defaultOpenValue={[ defaultValue, defaultValue ]}
                style={{ width: `100%` }}
                defaultValue={[ defaultValue, defaultValue ]}
            />
        </Form.Item>
    </>
)