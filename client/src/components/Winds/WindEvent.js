import { Form, Modal, Button, Input, Select } from 'antd';
import React, { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom";

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
                name="timeStart"
            >
                <Input placeholder='Время события' />
            </Form.Item>
        </>

    );
}