import { useEffect, useState } from 'react';
import { Table, Layout } from 'antd';
import { getDocuments } from '../../api/getDocuments';
import React from 'react';

const { Header, Footer, Sider, Content } = Layout; 

const columns = [
    {
        title: 'ID',
        dataIndex: 'id'
    },
    {
        title: 'Заголовок',
        dataIndex: 'title'
    }
]

async function getData() {
    const result = await getDocuments();
    return await result.json();
}

export const Documents = () => {
    const [ state, setState ] = useState([]);

    useEffect(() => {
        getData().then(docs => {
            setState(docs);
        })
    });

    if(state.length === 0) {
        return `Документов нет`;
    }
    return (
        <div className='container'>
            <Table 
                pagination={false}
                columns={columns}
                dataSource={state} 
            />
        </div>
    );
}