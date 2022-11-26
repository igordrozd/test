import React  from "react";
import { Form, Input, TimePicker } from 'antd';
import dayjs from 'dayjs';

const defaultValue = dayjs('00:00', 'mm:ss')
export const WindInform = () => (
    <>
        <Form.Item name="title">
            <Input placeholder='Введите информацию'/>
        </Form.Item>
        <Form.Item name="time">
                <TimePicker
                    format="mm:ss"
                    defaultOpenValue={defaultValue}
                    style={{ width: `100%` }}
                    defaultValue={defaultValue}
                />
            </Form.Item>
    </>
)