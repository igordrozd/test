import React, { useEffect, useState } from "react";
import { Button, Table, Space } from 'antd';
import { useParams } from "react-router-dom";
import { 
    EditOutlined, 
    DeleteOutlined 
} from '@ant-design/icons';
import { drawTimeline } from '../../utils/drawer';
import { deleteTaskById } from '../../api/deleteTasks';

import styles from './Editor.module.css';
import { getDocumentTasks } from "../../api/getDocumentTasks";
import {EditModal} from "../../components/EditModal";


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
        // render: (time) => time.toTimeString()
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

async function getData(id) {
    const result = await getDocumentTasks(id);
    return await result.json();
}

export const Editor = () => {
    const { id } = useParams();
    const [ tasks, setTasks ] = useState([]);
    const [ editTask, setEditTask ] = useState(null);

    const documentId = parseInt(id, 10);
    const createTask = () => setEditTask({});
    const closeEditModal = () => setEditTask(null);

    const load = () => getData(documentId).then(setTasks);

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        drawTimeline(0,1800,0);
    }, []);
    return(
        <>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div>Это имя документа</div>
                    <Button type="primary" onClick={createTask}>
                        Добавить действие
                    </Button>
                </div>
                <div className={styles.layout}>
                    <div className={styles.col}>
                        <Table
                            columns={columns}
                            dataSource={tasks}
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

            <EditModal
                documentId={documentId}
                visible={Boolean(editTask)}
                close={closeEditModal}
                callback={load}
            />
        </>
    );
}