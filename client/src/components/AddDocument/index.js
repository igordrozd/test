import React, { useEffect, useLayoutEffect, useState } from "react"
import { Form, Input, Modal, notification, Select } from 'antd';
import { postDocuments } from "../../api/postDocument";
import { putDocuments } from "../../api/putDocuments";


const createDocument = async (data,id) => {
    let response;
    if(id) {
        response = await putDocuments(data,id);
    } else {
        response = await postDocuments(data);
    }
    if(response.ok) {
        const json = await response.json();
        notification.success({
            message: `Запись добавлена`,
            description: `Запись "${json.title}" успешно добавлена`
        });
        return json;
    }
}

export const AddDocument = ({
    callback,
    visible,
    close
}) => {
    const [ form ] = Form.useForm();
    const [ isLoading, setLoading ] = useState(false);
    const title = visible?.id ? `Редактировать элемент` : "Создать элемент";
    const buttonText = visible?.id ? "Сохранить" : "Создать";

    const handleClose = () => {
        if(isLoading) {
            close();
            return;
        }
        close();
    }
    useEffect(() =>{
        if(visible?.id){
            form.setFieldsValue({type : visible.type,title : visible.title})
        }
    },[visible])
    
    const onSubmit = async () => {
        setLoading(true);
        const values = await form.validateFields();
        const visValue={type : visible.type,title : visible.title}
        const id=visible.id
        console.log({...visValue,...values})
        const document = await createDocument({...visValue,...values},id);
        form.resetFields();
        setLoading(false);
        callback(document);
        close();
    }
    return(
        <Modal
            open={Boolean(visible)}
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
                initialValues={{
                    type: 2
                }}
            >
                <Form.Item name="type">
                    <Select 
                        defaultValue={2}
                        options={[
                            {
                                value: 2,
                                label: 'Публичный',
                            },
                            {
                                value: 1,
                                label: 'Личный',
                            }
                            
                        ]}
                    />
                </Form.Item>
                <Form.Item name="title"
                rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}
                > 
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}