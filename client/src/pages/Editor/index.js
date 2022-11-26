import React, { useEffect, useState } from "react";
import { Button, Table, Space, notification } from 'antd';
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


const deleteTask = async (record) => {
    const response = await deleteTaskById(record.id);
    const json = await response.json();
    return json;
}

const columns = reload => [
    {
        title: `ID`,
        dataIndex: `id`
    },
    {
        title: `Имя события/операции`,
        dataIndex: `title`
    },
    {
        render: (_, record) => {
            const drop = async () => {
                await deleteTask(record);
                await reload();
                notification.success({
                    message: 'Запись успешно удалена',
                    description: `Запись "${record.title}" успешно удалена`
                });
            }
            return(
                <Space>
                    <Button size="small">
                        <EditOutlined />
                    </Button>
                    <Button size="small" onClick={drop}>
                        <DeleteOutlined />
                    </Button>
                </Space>
            );
        }
    }
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
                            columns={columns(load)}
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