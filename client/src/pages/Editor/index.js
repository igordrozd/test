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

const mapping = {
    "event": "Событие",
    "operation": "Операция",
    "inform" : "Служебные данные ",
    "instruction" : "Инструкция"
}

const getType = type => mapping[type];

const columns = (reload, editTask) => [
    {
        title: `ID`,
        dataIndex: `id`
    },
    {
        title: `Тип`,
        dataIndex: `type`,
        render: getType
    },
    {
        title: `Имя события/операции`,
        dataIndex: `title`,
    },
    {
        render: (_, record) => {
            console.log(record);
            const drop = async () => {
                await deleteTask(record);
                await reload();
                notification.success({
                    message: 'Запись успешно удалена',
                    description: `Запись "${record.title}" успешно удалена`
                });
            }
            const edit = () => {
                editTask(record);
            }
            return(
                <Space>
                    <Button size="small" onClick={edit}>
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
    const [ document, setDocument ] = useState(null)
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
console.log('sdfgh')
    useEffect(() => {
        drawer.setContext(ref.current);
        if (1){
            drawer.drawBackground('#FFFFFE');
            drawer.drawTimeline(0,1800,'#000000');
        }
        else{
            drawer.drawBackground('#000000');
            drawer.drawTimeline(0,1800,'green');
        }
        tasks.forEach(task =>{
            if (task.type === 'event'){
                const { start } = task;
                const startTime = new Date(start);
                const startHours = startTime.getHours();
                const startMinutes = startTime.getMinutes();
                const startSeconds = startTime.getSeconds();

                const startTotal = startHours*3600 + startMinutes*60 + startSeconds;
                if (task.title===null){
                    task.title='ТЕКСТ НЕ ЗАДАН'
                }
                drawer.drawSquare(startTotal, task.title, task.depth); 
                console.log('sdfgh')
                console.log(startTotal)
            }
             if (task.type==='operation'){
                const { start , end } = task;
                const startTime = new Date(start);
                const startHours = startTime.getHours();
                const startMinutes = startTime.getMinutes();
                const startSeconds = startTime.getSeconds();
                const startTotal = startHours*3600 + startMinutes*60 + startSeconds;

                const endTime = new Date(end);
                const endHours = endTime.getHours();
                const endMinutes = endTime.getMinutes();
                const endSeconds = endTime.getSeconds();
                const endTotal = endHours*3600 + endMinutes*60 + endSeconds;
                console.log('sdfgh')
                console.log(startTotal,endTotal) 
                drawer.drawOperation(startTotal,endTotal,task.depth); 
            }
            if (task.type==='inform'){
                const { start } = task;
                const startTime = new Date(start);
                const startHours = startTime.getHours();
                const startMinutes = startTime.getMinutes();
                const startSeconds = startTime.getSeconds();
                const startTotal = startHours*3600 + startMinutes*60 + startSeconds;
                console.log('sdfgh')
                console.log(startTotal)
                drawer.drawText(startTotal,task.title,task.depth); 
            }
            if (task.type==='instruction'){
                const { start } = task;
                const startTime = new Date(start);
                const startHours = startTime.getHours();
                const startMinutes = startTime.getMinutes();
                const startSeconds = startTime.getSeconds();
                const startTotal = startHours*3600 + startMinutes*60 + startSeconds;
                console.log('sdfgh')
                console.log(startTotal)
                drawer.drawSquare(startTotal,task.title,task.depth); 
            }

        });
        
    }, [ ref, tasks ]);

    useEffect(() =>{
        getDocument(documentId).then(response => {
            response.json().then(setDocument)
        });
    }, [ documentId ]);

    return(
        <>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div>{document?.title}</div>
                    <Button type="primary" onClick={createTask}>
                        Добавить действие
                    </Button>
                </div>
                <div className={styles.layout}>
                    <div className={styles.col}>
                        <Table
                            columns={columns(load, setEditTask)}
                            dataSource={tasks}
                        />
                    </div>
                    
                    <div  className={styles.col}>
                        <canvas 
                        className={styles.canvas}
                            ref={ref}
                            width={350*4} height={495*4}
                                />
                    </div>
                    
                </div>
            </div>

            <EditModal
                task={editTask}
                documentId={documentId}
                close={closeEditModal}
                callback={load}
            />
        </>
    );
}