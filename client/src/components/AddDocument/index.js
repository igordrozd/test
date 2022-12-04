import React, { useState } from "react"
import { Form, Input, Modal, notification, Select } from 'antd';
import { postDocuments } from "../../api/postDocument";


const createDocument = async (data) => {
    const response = await postDocuments(data);
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
    const handleClose = () => {
        if(isLoading) {
            return;
        }
        close();
    }
    const onSubmit = async () => {
        setLoading(true);
        const values = await form.validateFields();
        
        console.log(values)
        const document = await createDocument(values);
        form.resetFields();
        setLoading(false);
        callback(document);
        close();
    }
    return(
        <Modal
            open={visible}
            onCancel={handleClose}
            onOk={onSubmit}
            confirmLoading={isLoading}
            title="Создать документ"
            cancelText="Отмена"
            okText="Создать"

        >   
            <Form
                form={form}
                autoComplete="off"
                name="basic"
                initialValues={{
                    type: 1
                }}
            >
                <Form.Item name="type">
                    <Select 
                        defaultValue={1}
                        options={[
                            {
                                value: 1,
                                label: 'Личный',
                            },
                            {
                                value: 2,
                                label: 'Публичный',
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