import { Form, Input } from 'antd';
import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";

export const WindInform = () => {
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
                    <Input placeholder='Информация' />
                </Form.Item>
</>


    );
}