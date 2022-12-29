import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Table, Popconfirm, Space, Button, notification} from 'antd';
import { 
    EditOutlined, 
    DeleteOutlined 
} from '@ant-design/icons';
import { getDocuments } from '../../api/getDocuments';
import { deleteDocumentById } from '../../api/deletedocuments';
import {formatDate} from "../../utils/formatDate";
import { AddDocument } from "../../components/AddDocument";
import {Header} from "../../components/Header";
import {sort} from "../Editor/Sortscripts"
import { Form, Modal, Select } from 'antd';
const deleteDocument = async (record) => {
    const response = await deleteDocumentById(record.id);
    if(response.ok) {
        notification.success({
            message: `Документ удалён`,
            description: `Документ "${record.title}" успешно удалён`
        })
    }
}

async function getData() {
    const result = await getDocuments();
    return await result.json();
}

const columns = (reload) => [
    {
        width: 80,
        title: 'ID',
        dataIndex: 'id'
    },
    {
      width: 200,
      title: `Дата создания`,
      dataIndex: 'updatedAt',
      render: formatDate
    },
    {
        title: 'Заголовок',
        dataIndex: 'title'
    },
    {
        title: 'Создатель',
        dataIndex: 'creator'
    },
    {
        title: 'Внёс изменения',
        dataIndex: 'changer'
    },
    {
        render: (_, record) => {
            const deleteDoc = async () => {
                await deleteDocument(record);
                await reload();
            }
            return(
                <Space>
                    <Link to={`/documents/${record.id}`}>
                        <Button size="small">
                            <EditOutlined />
                        </Button>
                    </Link>
                    <Popconfirm 
                        title="Вы уверены, что хотите удалить?" 
                        onConfirm={deleteDoc}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button size="small">
                            <DeleteOutlined />
                        </Button>
                    </Popconfirm>
                    
                </Space>
            );
        }
    }
]

export const Documents = () => {
    let [ state, setState ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ editDocument, setEditDocument ] = useState(null);
    const [type, setType]=useState('id')
    const createDocument = () => setEditDocument({});
    const closeEditDocument = () => setEditDocument(null);
    const [ form ] = Form.useForm();
    
    const load = () => {
        setLoading(true);
        getData().then(setState);
        setLoading(false);
    }

    useEffect(() => {
        load();
    }, [type]);
    state=sort(state,type)
    return (
        <>
            <Header>
                <Form
                    form={form}
                    autoComplete="off"
                    name="basic"
                >

            
                
                    <Form.Item name="type">
                        <Select 
                            type="primary"
                            style={{ width: 180,top: 12 }}
                            onChange={setType}
                            defaultValue="id"
                            options={[
                                
                                {
                                    value: 'create',
                                    label: 'время создания',
                                },
                                {
                                    value: 'update',
                                    label: 'время обновления',
                                },
                                {
                                    value: 'changer',
                                    label: 'последний изменявший',
                                },
                                {
                                    value: 'id',
                                    label: 'id',
                                },
                                {
                                    value: 'title',
                                    label: 'имя',
                                },
                                {
                                    value: 'creator',
                                    label: 'создатель',
                                }
                            ]}
                        />
                    </Form.Item>
                </Form>
                <Button type="primary" onClick={createDocument}>
                    Добавить документ
                </Button>
            </Header>
            <div className='container'>
                <Table
                    loading={loading}
                    columns={columns(load)}
                    dataSource={state}
                />
            </div>
            <AddDocument
                callback={load}
                close={closeEditDocument}
                visible={Boolean(editDocument)}
            />
        </>
    );
}