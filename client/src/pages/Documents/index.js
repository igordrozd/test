import { useEffect, useState } from 'react';
import { Table, Layout, Space, Button } from 'antd';
import { 
    EditOutlined, 
    DeleteOutlined 
} from '@ant-design/icons';
import { getDocuments } from '../../api/getDocuments';
import React from 'react';
import { Link } from 'react-router-dom';
import { deleteDocuments } from '../../api/deletedocuments';

const { Header, Footer, Sider, Content } = Layout; 

const columns = [
    {
        title: 'ID',
        dataIndex: 'id'
    },
    {
        title: 'Заголовок',
        dataIndex: 'title'
    },
    {
        render: (_, record) => {
            return(
                <Space>
                    <Link to={`/documents/${record.id}`}>
                        <Button size="small">
                            <EditOutlined />
                        </Button>
                    </Link>

                    <Button size="small" onClick={deleteDocuments}>
                        <DeleteOutlined />
                    </Button>
                </Space>
            );
        }
    }
]

async function getData() {
    const result = await getDocuments();
    return await result.json();
}

export const Documents = () => {
    const [ state, setState ] = useState([]);

    useEffect(() => {
        getData().then(setState)
    }, []);

    if(state.length === 0) {
        return `Документов нет`;
    }
    return (
        <div className='container'>
            <Table 
                columns={columns}
                dataSource={state} 
            />
        </div>
    );
}