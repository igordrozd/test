import React, { useEffect, useState } from "react"
import {Form, Modal, notification, Select} from 'antd';
import { useNavigate, useLocation } from "react-router-dom";
import { WindEvent } from "./WindEvent";
import { WindInform } from "./WindInform";
import { WindOperation } from "./WindOperation";
import { postTasks } from "../../api/postTasks";
import { putTasks } from "../../api/putTasks";
import { WindInstruction } from "./WindInstruction";

function getFields(type) {
    if(type === 'event') {
        return <WindEvent />
    } else if(type === 'inform'){
        return <WindInform />
    } else if(type === 'instruction'){
        return <WindInstruction />
    }
    else {
        return <WindOperation />
    }
}

const createTask = async (data) => {
    let response;
    console.log(data);
    if(data.id) {
        response = await putTasks(data, data.id);
    } else {
        response = await postTasks(data);
    }
    if(response.ok) {
        const json = await response.json();
        notification.success({
            message: `Запись ${data.id ? `изменена` : `добавлена`}`,
            description: `Запись "${json.title}" успешно ${data.id ? `изменена` : `добавлена`}`
        });
        return json;
    }
}

export const EditModal = ({
    documentId,
    callback,
    close,
    task
}) => {
    const [ form ] = Form.useForm();
    const [ type, setType ] = useState('event');
    const [ isLoading, setLoading ] = useState(false);
    const title = task?.id ? `Редактировать элемент` : "Создать элемент";
    const buttonText = task?.id ? "Сохранить" : "Создать";
    const handleClose = () => {
        if(isLoading) {
            return;
        }
        close();
    }
    const onSubmit = async () => {
        setLoading(true);
        const values = await form.validateFields();
        
        const record = await createTask({
            ...task,
            ...values,
            documentId: documentId,
            type
        });
        form.resetFields();
        setLoading(false);
        callback(record);
        close();
    }
    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(task);
    }, [ task ]);
    return(
        <Modal
            open={Boolean(task)}
            onCancel={handleClose}
            onOk={onSubmit}
            confirmLoading={isLoading}
            title={title}
            cancelText="Отмена"
            okText={buttonText}
        >
           
            <Form
                form={form}
                autoComplete="off"
                name="basic"
            >
                <Form.Item name="type">
                    <Select 
                        onChange={setType}
                        defaultValue="event"
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
                            },
                            {
                                value: 'instruction',
                                label: 'Инструкция',
                            }
                        ]}
                    />
                </Form.Item>
                <Form.Item name="depth">
                    <Select 
                        defaultValue={0}
                        options={[
                            {
                                value: 0,
                                label: '1 уровень',
                            },
                            {
                                value: 1,
                                label: '2 уровень',
                            },
                            {
                                value: 2,
                                label: '3 уровень',
                            }
                        ]}
                    />
                </Form.Item>
                {getFields(type)}
            </Form>
        </Modal>
    );
}