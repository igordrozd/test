import React from "react"
import dayjs from 'dayjs';
import { Form,  Input, TimePicker } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const defaultValue = dayjs('00:00', 'HH:mm')
export const WindFolder = () => (
        <>
            <Form.Item name="title"
                // rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}
                >
                <Input placeholder='Введите название'/>
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