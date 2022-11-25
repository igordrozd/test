import React, { useState } from "react"
import {Form, Modal, notification, Select} from 'antd';
import { useNavigate, useLocation } from "react-router-dom";
import { WindEvent } from "./WindEvent";
import { WindInform } from "./WindInform";
import { WindOperation } from "./WindOperation";
import { postTasks } from "../../api/postTasks";

function getFields(type) {
    if(type === 'event') {
        return <WindEvent />
    } else if(type === 'inform'){
        return <WindInform />
    } else {
        return <WindOperation />
    }
}

const createTask = async (data) => {
    const response = await postTasks(data);
    if(response.ok) {
        const json = await response.json();
        notification.success({
            message: `Запись добавлена`,
            description: `Запись "${json.title}" успешно добавлена`
        });
        return json;
    }
}

export const EditModal = ({
    documentId,
    callback,
    visible,
    close
}) => {
    const [ form ] = Form.useForm();
    const [ type, setType ] = useState('event');
    const [ isLoading, setLoading ] = useState(false);
    const handleClose = () => {
        if(isLoading) {
            return;
        }
        close();
    }
    const onSubmit = async () => {
        setLoading(true);
        const values = await form.validateFields();
        const task = await createTask({
            ...values,
            documentId: documentId
        });
        form.resetFields();
        setLoading(false);
        callback(task);
        close();
    }
    return(
        <Modal
            open={visible}
            onCancel={handleClose}
            onOk={onSubmit}
            confirmLoading={isLoading}
            title="Создать элемент"
            cancelText="Отмена"
            okText="Создать"
        >
           
            <Form
                form={form}
                autoComplete="off"
                name="basic"
            >

                <Form.Item name="type">
                    <Select 
                        defaultValue="event"
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