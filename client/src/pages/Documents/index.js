import { useEffect, useState } from 'react';
import { Table } from 'antd';
import sendRequest from '../../utils/request';

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
    const result = await sendRequest(`http://localhost:8000/api/documents`, 'GET');
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
        <Table 
            pagination={false}
            columns={columns}
            dataSource={state} 
        />
    );
}