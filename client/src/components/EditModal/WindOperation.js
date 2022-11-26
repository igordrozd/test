import React from "react";
import { Form, Input, TimePicker } from 'antd';
import dayjs from 'dayjs';

export const WindOperation = () => (
    <>
        <Form.Item name="title">
            <Input placeholder='Введите название'/>
        </Form.Item>
        <Form.Item name="time">
            <TimePicker.RangePicker  
                format="mm:ss"
                defaultOpenValue={dayjs('00:00', 'mm:ss')}
                style={{ width: `100%` }}
            />
        </Form.Item>
    </>
)