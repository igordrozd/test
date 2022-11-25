import React, { useEffect } from "react";
import { Button, Table, Space } from 'antd';
import { useParams, Link, useLocation } from "react-router-dom";
import { 
    EditOutlined, 
    DeleteOutlined 
} from '@ant-design/icons';
import { drawTimeline } from '../../utils/drawer';
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
    useEffect(() => {
        drawTimeline(0,1800,0);
    }, []);
    return(
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div>Это имя документа</div>
                <Link to={`${location.pathname}/create`}>
                    <Button type="primary">
                        Добавить действие
                    </Button>
                </Link>
            </div>
            <div className={styles.layout}>
                <div className={styles.col}>
                    <Table 
                        columns={columns} 
                        dataSource={data} 
                    />
                    
                </div>
                <div  className={styles.col}>
                    <canvas 
                        id="canvas" 
                        className={styles.canvas}
                    />
                 </div>
             </div>
         </div>
    );
}