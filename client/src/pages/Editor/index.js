import React, { useEffect, useState, useRef } from "react";
import { Button, Table, Space, notification, Popconfirm } from 'antd';
import { useParams } from "react-router-dom";
import { 
    EditOutlined, 
    DeleteOutlined, 
    FlagFilled
} from '@ant-design/icons';



import { Drawer } from '../../utils/drawer';

import { deleteTaskById } from '../../api/deleteTasks';

import styles from './Editor.module.css';
import { getDocumentTasks } from "../../api/getDocumentTasks";
import { EditModal } from "../../components/EditModal";
import { getDocument } from "../../api/getDocumentByid"
import {Header} from "../../components/Header";

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
        width: 50,
        title: `ID`,
        dataIndex: `id`
    },
    {
        width: 180,
        title: `Тип`,
        dataIndex: `type`,
        render: getType
    },
    {
        title: `Имя события/операции`,
        dataIndex: `title`,
    },
    {
        title: `Время, мин:ч`,
        dataIndex: `start`,
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
                        <Popconfirm 
                            title="Вы уверены, что хотите удалить?" 
                            onConfirm={drop}
                            okText="Да"
                            cancelText="Нет"
                        >
                        <Button size="small">
                                <DeleteOutlined />
                        </Button>
                    </Popconfirm>
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
        tasks.forEach(task => {
            if (task.type === 'event'){
                const { start } = task;
                const startTime = new Date(start);
                const startHours = startTime.getHours();
                const startMinutes = startTime.getMinutes();
                const startSeconds = startTime.getSeconds();
                const startTotal = startHours * 3600 + startMinutes * 60 + startSeconds;
                let flag=false
                tasks.forEach(taskv =>{
                    if (taskv.type==='operation'){
                        const { start , end } = taskv;
                        const startTime = new Date(start);
                        const startHours = startTime.getHours();
                        const startMinutes = startTime.getMinutes();
                        const startSeconds = startTime.getSeconds();
                        const startTotal1 = startHours*3600 + startMinutes*60 + startSeconds;

                        const endTime = new Date(end);
                        const endHours = endTime.getHours();
                        const endMinutes = endTime.getMinutes();
                        const endSeconds = endTime.getSeconds();
                        const endTotal1 = endHours*3600 + endMinutes*60 + endSeconds;
                        if (startTotal1<=startTotal &&  endTotal1>=startTotal && taskv.depth===task.depth){
                            console.log(startTotal1,startTotal,endTotal1)
                            flag=true;
                        }}
                })
                console.log(flag)
                if  (flag===true){
                    drawer.drawSquare(startTotal, task.title, task.depth,20)}
                else{
                    drawer.drawSquare(startTotal, task.title, task.depth,-23)
                }
            }
             if (task.type === 'operation'){
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
                drawer.drawOperation(startTotal,endTotal,task.depth, task.title);
            }
            if (task.type==='inform'){
                let flag=false
                const { start } = task;
                const startTime = new Date(start);
                const startHours = startTime.getHours();
                const startMinutes = startTime.getMinutes();
                const startSeconds = startTime.getSeconds();
                const startTotal = startHours*3600 + startMinutes*60 + startSeconds;

                tasks.forEach(taskv =>{
                    if (taskv.type==='operation'){
                        const { start , end } = taskv;
                        const startTime = new Date(start);
                        const startHours = startTime.getHours();
                        const startMinutes = startTime.getMinutes();
                        const startSeconds = startTime.getSeconds();
                        const startTotal1 = startHours*3600 + startMinutes*60 + startSeconds;

                        const endTime = new Date(end);
                        const endHours = endTime.getHours();
                        const endMinutes = endTime.getMinutes();
                        const endSeconds = endTime.getSeconds();
                        const endTotal1 = endHours*3600 + endMinutes*60 + endSeconds;
                        if (startTotal1<=startTotal &&  endTotal1>=startTotal && taskv.depth===task.depth){
                            console.log(startTotal1,startTotal,endTotal1)
                            flag=true;
                        }}
                })
                if  (flag===true){
                    drawer.drawText(startTotal,task.title,task.depth,50)}
                else{
                    drawer.drawText(startTotal,task.title,task.depth,0)}
                
            }
            if (task.type==='instruction'){
                let flag=false
                const { start } = task;
                const startTime = new Date(start);
                const startHours = startTime.getHours();
                const startMinutes = startTime.getMinutes();
                const startSeconds = startTime.getSeconds();
                const startTotal = startHours*3600 + startMinutes*60 + startSeconds;

                tasks.forEach(taskv =>{
                    if (taskv.type==='operation'){
                        const { start , end } = taskv;
                        const startTime = new Date(start);
                        const startHours = startTime.getHours();
                        const startMinutes = startTime.getMinutes();
                        const startSeconds = startTime.getSeconds();
                        const startTotal1 = startHours*3600 + startMinutes*60 + startSeconds;

                        const endTime = new Date(end);
                        const endHours = endTime.getHours();
                        const endMinutes = endTime.getMinutes();
                        const endSeconds = endTime.getSeconds();
                        const endTotal1 = endHours*3600 + endMinutes*60 + endSeconds;
                        if (startTotal1<=startTotal &&  endTotal1>=startTotal && taskv.depth===task.depth){
                            console.log(startTotal1,startTotal,endTotal1)
                            flag=true;
                        }}
                })
                if  (flag===true){
                    drawer.drawinform(startTotal,task.title,task.depth,50)}
                else{
                    drawer.drawinform(startTotal,task.title,task.depth,0)}
                
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
            <Header document={document}>
                <Button type="primary" onClick={createTask}>
                    Добавить действие
                </Button>
            </Header>
            <div className="container">
                <div className={styles.wrapper}>
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