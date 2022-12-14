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
import { putDocuments } from '../../api/putDocuments';
import {formatDate} from "../../utils/formatDate";
import { AddDocument } from "../../components/AddDocument";
import { Header } from "../../components/Header";
import styles from "./Documents.module.css"

const deleteDocument = async (record) => {
    const response = await deleteDocumentById(record.id);
    if(response.ok) {
        notification.success({
            message: `Документ удалён`,
            description: `Документ "${record.title}" успешно удалён`
        })
    }
}

const editDocum = async (record) => {
    const response = await putDocuments(record.id);
    if(response.ok) {
        notification.success({
            message: `Документ изменён`,
            description: `Документ "${record.title}" успешно изменён`
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
        title: 'Заголовок',
        render: (_, record) => {
            return(
                <Space>
                    <Link to={`/documents/${record.id}`} className={styles.documLink}>
                        {record.title}
                    </Link>
                </Space>
            );
        }
    },
    {
      width: 200,
      title: `Дата создания`,
      dataIndex: 'updatedAt',
      render: formatDate
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

            const editDoc = async () => {
                await editDocum(record);
                await reload();
            }
            
            return(
                <Space>

                        <Button size="small" onClick={editDoc}>
                            <EditOutlined />
                        </Button>

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
    const [ state, setState ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ editDocument, setEditDocument ] = useState(null);
    const createDocument = () => setEditDocument({});
    const closeEditDocument = () => setEditDocument(null);

    const load = () => {
        setLoading(true);
        getData().then(setState);
        setLoading(false);
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <> 
            <Header>
                <Space>
                    <Button type="primary" onClick={createDocument}>
                        Добавить документ
                    </Button>
                </Space>
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