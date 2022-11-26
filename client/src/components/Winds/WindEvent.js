import { Form, Modal, Button, Input, TimePicker } from 'antd';
import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const WindEvent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [ state, setState ] = useState(true);

    const close = () => {
        setState(false);
        const newLocation = location.pathname.replace('/create', '');
        navigate(newLocation);
    }
    return(
        <>
            <Form.Item
                name="name"
            >
                <Input placeholder='Введите название'/>
            </Form.Item>

            <Form.Item 
                name="time"
            >
                <TimePicker 
                    defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} 
                    style={{ width: `100%` }}
                />
            </Form.Item>
        </>

    );
}