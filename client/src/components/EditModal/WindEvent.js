import React from "react"
import dayjs from 'dayjs';
import { Form,  Input, TimePicker } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const WindEvent = () => (
        <>
            <Form.Item name="title">
                <Input placeholder='Введите название'/>
            </Form.Item>
            <Form.Item name="time">
                <TimePicker
                    format="mm:ss"
                    defaultOpenValue={dayjs('00:00', 'mm:ss')}
                    style={{ width: `100%` }}
                />
            </Form.Item>
        </>
)