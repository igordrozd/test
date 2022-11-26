import React from "react";
import { Form, Input, TimePicker } from 'antd';
import dayjs from 'dayjs';

const defaultValue = dayjs('00:00', 'mm:ss')
export const WindOperation = () => (
    <>
        <Form.Item name="title">
            <Input placeholder='Введите название'/>
        </Form.Item>
        <Form.Item name="time">
            <TimePicker.RangePicker  
                format="mm:ss"
                defaultOpenValue={[ defaultValue, defaultValue ]}
                style={{ width: `100%` }}
                defaultValue={[ defaultValue, defaultValue ]}
            />
        </Form.Item>
    </>
)