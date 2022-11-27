import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from 'antd';
import { TasksList } from "./TasksList";
import { getDocumentTasks } from "../../api/getDocumentTasks";
import { EditModal } from "../../components/EditModal";
import { getDocument } from "../../api/getDocumentByid"
import {Header} from "../../components/Header";
import { Preview } from './Preview';
import styles from './Editor.module.css';


async function getData(id) {
    const result = await getDocumentTasks(id);
    return await result.json();
}

export const Editor = () => {
    
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
                            <TasksList
                                reload={load}
                                tasks={tasks}
                                edit={setEditTask}
                            />
                        </div>
                        <div  className={styles.col}>
                            <Preview tasks={tasks} />
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