import React from "react";
import { Button, Table, Space } from 'antd';
import { useParams, Link, useLocation } from "react-router-dom";
import { 
    EditOutlined, 
    DeleteOutlined 
} from '@ant-design/icons';

import { deleteTaskById } from '../../api/deleteTask';

import styles from './Editor.module.css';

const deleteTask = (record) => {
    const response = deleteTaskById(record.id);
    const json = response.json();
    console.log(json);
}

const columns = [
    {
        title: `ID`,
        dataIndex: `id`
    },
    {
        title: `Имя события/операции`,
        dataIndex: `title`
    },
    {
        title: `Время/промежуток`,
        dataIndex: `time`,
        render: (time) => time.toTimeString()
    },
    {
        render: (_, record) => {
            return(
                <Space>
                    <Button size="small">
                        <EditOutlined />
                    </Button>
                    <Button size="small" onClick={() => deleteTask(record)}>
                        <DeleteOutlined />
                    </Button>
                </Space>
            );
        }
    }
]
const data = [
    {
        id: 1,
        title: `Test title`,
        time: new Date()
    },
    {
        id: 2,
        title: `Заголовок 2`,
        time: new Date()
    },
    {
        id: 3,
        title: `Заголовок 3`,
        time: new Date()
    },
    {
        id: 4,
        title: `Заголовок 4`,
        time: new Date()
    },
]
export const Editor = () => {
    let { id } = useParams();
    const location = useLocation();
    return(
        <div className={styles.layout}>
            <div className={styles.col}>
                <Table 
                    columns={columns} 
                    dataSource={data} 
                />
                <Link to={`${location.pathname}/create`}>
                    Добавить таск
                </Link>
            </div>
            <div  className={styles.col}>

            </div>
        </div>
    );
}