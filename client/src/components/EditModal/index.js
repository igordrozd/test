import dayjs from 'dayjs';
import React, { useEffect, useState } from "react"
import { Form, Modal, notification, Select } from 'antd';
import { WindEvent } from "./WindEvent";
import { WindInform } from "./WindInform";
import { WindOperation } from "./WindOperation";
import { postTasks } from "../../api/postTasks";
import { putTasks } from "../../api/putTasks";
import { WindInstruction } from "./WindInstruction";
import styles from 'C:/code/test/client/src/pages/Editor/Editor.module.css'
import { ColorButton } from "../../components/ColorButton";

function getFields(type) {
    if(type === 'event') {
        return <WindEvent />
    } else if(type === 'inform') {
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
    const { time } = data;
    let start, end;
    if(Array.isArray(time)) {
        ([ start, end ] = time);
    } else {
        start = time;
    }
    const startTime = new Date(start);
    const endTime = end ? new Date(end) : start;
    const body = {
        ...data,
        end: endTime,
        start: startTime,
    }
    console.log(body.color)
    if(data.id) {
        response = await putTasks(body, data.id);
    } else {
        response = await postTasks(body);
    }
    if(response.ok) {
        const json = await response.json();
        notification.success({
            message: `Запись ${data.id ? `изменена` : `добавлена`}`,
            description: `Запись "${json.title}" успешно ${data.id ? `изменена` : `добавлена`}`,
            duration: 1.5
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
    const [ type, setType ] = useState(task?.type || 'event');
    const [ isLoading, setLoading ] = useState(false);
    const [ GraphColorTask , setGraphColorTask ] = useState('#100000');
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
        let colorn=GraphColorTask
        if (task.color){
            if (GraphColorTask!=='#100000'){
                colorn=GraphColorTask
            }
            else{
                colorn=task.color
            }
        }
        else{
            colorn=GraphColorTask
        }
        const record = await createTask({
            ...task,
            ...values,
            color: colorn,
            documentId: documentId,
            type
        });
        console.log(GraphColorTask)
        setGraphColorTask('#100000')
        form.resetFields();
        setLoading(false);
        callback(record);
        close();
    }
    
    useEffect(() => {
        
        const newType = task?.type || 'event';
        const defaultTime = dayjs('00:00', 'HH:mm');
        
        setType(newType);
        form.resetFields();
        
        const { start, end } = task || {};
        
        if(task?.id) {
            form.setFieldsValue({
                ...task,
                time: (start === end ? dayjs(start) : [
                    dayjs(start),
                    dayjs(end)
                ])
            });
        } else {
            console.log(newType);
            switch(newType) {
                case 'event':
                case 'inform':
                case 'instruction':
                    form.setFieldsValue({
                        time: defaultTime
                    });
                    break;
                default:
                    form.setFieldsValue({
                        time: [ defaultTime, defaultTime ]
                    });
                    break;
            }
            
        }
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
           <div className={styles.control}>
                <ColorButton onChange={setGraphColorTask} value={'#100000'}>
                    Цвет графики
                </ColorButton>
            </div>
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