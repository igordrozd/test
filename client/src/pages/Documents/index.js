import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Table, Layout, Space, Button, notification} from 'antd';
import { 
    EditOutlined, 
    DeleteOutlined 
} from '@ant-design/icons';
import { getDocuments } from '../../api/getDocuments';
import { deleteDocumentById } from '../../api/deletedocuments';
import {formatDate} from "../../utils/formatDate";
import { AddDocument } from "../../components/AddDocument";
import { useStore } from '../../App';

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
    // {
    //     width: 200,
    //     title: `Дата изменения`,
    //     dataIndex: 'updatedAt',
    //     render: formatDate
    //   },
    {
        title: 'Заголовок',
        dataIndex: 'title'
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
                    <Button size="small" onClick={deleteDoc}>
                        <DeleteOutlined />
                    </Button>
                </Space>
            );
        }
    }
]

export const Documents = () => {
    const { authorize, store } = useStore();
    const [ state, setState ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ editDocument, setEditDocument ] = useState(null);
    const createDocument = () => setEditDocument({});
    const closeEditDocument = () => setEditDocument(null);

    const logout = async() => {
        localStorage.removeItem('auth_token');
        await authorize();
    }

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
        {store.user?.name}
        <Button onClick={logout}>
            Выйти
        </Button>
        <Button type="primary" onClick={createDocument}>
            Добавить документ
        </Button>
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