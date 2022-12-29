
import React from "react";
import { 
    DeleteOutlined,
    MailOutlined,
    FolderOutlined,
    BorderOutlined,
    ExpandOutlined,
    LineOutlined,
    DownOutlined,
    EditOutlined,
    FolderAddOutlined
} from '@ant-design/icons';
import { Button, Table, Space, notification, Popconfirm } from 'antd';
import { deleteTaskById } from '../../api/deleteTasks';
import type { ColumnsType } from 'antd/es/table';
import styles from './Editor.module.css';

interface DataType {
    key: React.ReactNode;
    id: number;
    title: number;
    type: string;
    children?: DataType[];
  }



const deleteTask = async (record) => {
    const response = await deleteTaskById(record.id);
    const json = await response.json();
    return json;
}




const columns: ColumnsType<DataType> = (reload, editTask,sort,tasksinfolder) => [
    {
        width: 250,
        title: `ID`,
        dataIndex: `id`,
        sorter: (a, b) => a.id - b.id
    },
    {
        width: 20,
        title: `Тип`,
        // dataIndex: `type`,
        // render: getType
        sorter: (a, b) =>a.type.localeCompare(b.type),
        render: (_, record) =>{
            if (record.type==="event"){
                return (
                    <>
                        
                            <BorderOutlined style={{color: "#4E89FF"}}/>
                        
                        
                    </>
                )
            }
            if (record.type==="operation"){
                return (
                    <>
                    
                        <LineOutlined style={{color:record.color.replace('#', '')}}/>
                    
                        
                    </>
                )
            }
            if (record.type==="folder"){
                const createTasks=() =>{
                    editTask({dependability:record.id})
                }
                return (
                    <>
                        <Button size="small" onClick={createTasks} icon={<FolderAddOutlined style={{color:record.color.replace('#', '')}}/>} style={{left: -6}}>
                            
                        </Button>
                        
                    </>
                )
            }
            if (record.type==="instruction"){
                return (
                    <>
                        
                            <ExpandOutlined style={{color:record.color.replace('#', '')}}/>
                        
                    </>
                )
            }
            if (record.type==="inform"){
                return (
                    <>
                        
                            <MailOutlined style={{color:record.color.replace('#', '')}}/>
                        
                    </>
                )
            }
        }
    },
    {
        width: 400,
        title: `Имя события/операции`,
        dataIndex: `title`,
        sorter: (a, b) =>a.title.localeCompare(b.title)
        
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
            const edit = () => {
                editTask(record);
            }
            const takeTasks=() =>{
                tasksinfolder(record.id)
            }
            const createTasks=() =>{
                editTask({dependability:record.id})
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
export const TasksList = ({ reload, edit, tasks, usl,sort,tasksinfolder,independtid,findTaskdepend}) =>{
    
    const getTasksinFolder =(id)=>{return (tasks.filter(o => o.dependability===id[id.length - 1]))}
    let iddep=null
    if (independtid.length>0)
    {
        
        tasks=getTasksinFolder(independtid)
        iddep=independtid[independtid.length - 1]
    }
    
    // tasks=(sort(tasks,usl))
    const editTask = (record) => {   
        edit(record);
    }
    console.log(iddep)
    return (
        <Table
            showLine
            switcherIcon={<DownOutlined />}
            columns={columns(reload, edit,sort,tasksinfolder)}
            dataSource={(findTaskdepend(iddep,tasks.filter(o => o.dependability===iddep)))}
            onRow={(record) => {
                return {
                  onDoubleClick: () => {
                    tasksinfolder(record.id);
                  },
                };
              }}
        />
    )
}