import React, { useEffect, useState, useRef } from "react";
import { Button, Table, Space, notification } from 'antd';
import { useParams } from "react-router-dom";
import { 
    EditOutlined, 
    DeleteOutlined 
} from '@ant-design/icons';

import { Drawer } from '../../utils/drawer';

import { deleteTaskById } from '../../api/deleteTasks';

import styles from './Editor.module.css';
import { getDocumentTasks } from "../../api/getDocumentTasks";
import { EditModal } from "../../components/EditModal";
import { getDocument } from "../../api/getDocumentByid"

async function findDocById(id) {
    const response = await getDocument(id);
    const json = await response.json();
    return json;
}

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
const drawer = new Drawer({
    width: 350*4,
    height: 495*4
});
export const Editor = () => {
    const ref = useRef(null);
    const { id } = useParams();
    const [ tasks, setTasks ] = useState([]);
    const [ document, setDocument ] = useState()
    const [ editTask, setEditTask ] = useState(null);

    const documentId = parseInt(id, 10);
    const createTask = () => setEditTask({});
    const closeEditModal = () => setEditTask(null);

    const load = () => getData(documentId).then(setTasks);

    useEffect(() => {
        load();
    }, []);

const a =90;
const b=270;
const c=1;
    useEffect(() => {
        drawer.setContext(ref.current);
        drawer.drawBackground();
        drawer.drawTimeline();
        tasks.forEach(task =>{
            if (task.Type===1){
                const time=task.start.split(':').map(item => parseInt(item, 10))
                drawer.drawSquare(time[0]*3600+time[1]*60+time[2],task.title,task.nesting); 
            }
            if (task.Type===2){
                const time=task.start.split(':').map(item => parseInt(item, 10))
                const time1=task.end.split(':').map(item => parseInt(item, 10))
                drawer.drawOperation(time[0]*3600+time[1]*60+time[2],time1[0]*3600+time1[1]*60+time1[2],task.nesting); 
            }
            if (task.Type===3){
                const time=task.start.split(':').map(item => parseInt(item, 10))
                drawer.drawText(time[0]*3600+time[1]*60+time[2],task.title,task.nesting); 
            }

        });
        
    }, [ ref, tasks ]);

    return(
        <>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div>ВОТ ТУТ ИМЯ</div>
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
                        ref={ref}
                        width={350*4} height={495*4}
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