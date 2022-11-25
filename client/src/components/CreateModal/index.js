import React, { useState } from "react"
import { Form, Modal, Select } from 'antd';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { WindEvent } from "../Winds/WindEvent";
import { WindInform } from "../Winds/WindInform";
import { WindOperation } from "../Winds/WindOperation";

function onFinish() {}

function getFields(type) {
    if(type === 'event') {
        return <WindEvent />
    } else if(type === 'inform'){
        return <WindInform />
    } else {
        return <WindOperation />
    }
        
    }

export const CreateModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [ state, setState ] = useState(true);
    const [ type, setType ] = useState('event');
    const close = () => {
        setState(false);
        const newLocation = location.pathname.replace('/create', '');
        navigate(newLocation);
    }
    return(
        <Modal 
            title="Создать элемент" 
            open={state} 
            onCancel={close}
            cancelText="Отмена"
            okText="Создать"
        >
           
            <Form
                onFinish={onFinish}
                name="basic"
                autoComplete="off"
            >

                <Form.Item
                    name="choose"
                >
                    <Select 
                        defaultValue="Событие" 
                        onChange={setType}     
                        options={[
                            {
                            value: 'event',
                            label: 'Событие',
                            },
                            {
                            value: 'inform',
                            label: 'Служебные данные',
                            },
                            {
                            value: 'operation',
                            label: 'Операция',
                            }
                        ]}
                    />
                </Form.Item>
                {getFields(type)}
            </Form>
        </Modal>
    );
}