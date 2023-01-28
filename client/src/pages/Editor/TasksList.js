
import dayjs from 'dayjs';
import React, { useEffect, useState } from "react";
import { 
    DeleteOutlined,
    MailOutlined,
    FolderOutlined,
    BorderOutlined,
    ExpandOutlined,
    LineOutlined,
    DownOutlined,
    EditOutlined,
    FolderAddOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { Button, Table, Space, notification, Popconfirm, Menu, Dropdown, Tooltip,Input } from 'antd';
import { deleteTaskById } from '../../api/deleteTasks';
import type { ColumnsType } from 'antd/es/table';
import styles from './Editor.module.css';
import { dateToSeconds } from "../../utils/dateToSeconds";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { createTask } from "../../components/EditModal";
import { getDocumentTasks } from "../../api/getDocumentTasks";

dayjs.extend(customParseFormat);
interface DataType {
    key: React.Key;
    id: number;
    title: number;
    type: string;
    start: Date;
    end: Date;
    children?: DataType[];
  }

async function getData(id) {
    const result = await getDocumentTasks(id);
    return await result.json();
}

const deleteTask = async (record) => {
    const response = await deleteTaskById(record.id);
    console.log(record.id)
    const json = await response.json();
    return json;
}




const columns: ColumnsType<DataType> = (reload, editTask,sort,tasksinfolder,tasks) => [
    {
        width: 200,
        dataIndex: `title`,
        title: `Имя события/операции`,
        sorter: (a, b) =>a.title.localeCompare(b.title),
        
    },
    {
        title: `Тип`,
        dataIndex: `type`,
        sorter: (a, b) =>a.type.localeCompare(b.type),
    },
        
    {
        title: 'Время',
        render: (_, record) => {
            
            const start=tasks.find(a => a.id==record.id).start;
            const dDate = new Date(start);
            const hours = dDate.getHours();
            const minutes = dDate.getMinutes();
            if (record.type!="operation"){
            return(
                <>
                <p>{(hours>=10)?(hours):(hours+"0")}:{(minutes>=10)?(minutes):(minutes+"0")}</p>
                </>
            )}

            else{
                const end=tasks.find(a => a.id==record.id).end;
            
                const dDate1 = new Date(end);
                const hours1 = dDate1.getHours();
                const minutes1 = dDate1.getMinutes();
                return(
                <>
                <p>{(hours>=10)?(hours):(hours+"0")}:{(minutes>=10)?(minutes):(minutes+"0")}-{(hours1>=10)?(hours1):(hours1+"0")}:{(minutes1>=10)?(minutes1):(minutes1+"0")}</p>
                </>)
            }
            
        },
        sorter: (c, b) => (new Date(tasks.find(a => a.id==c.id).start).getHours()+60*(new Date(tasks.find(a => a.id==c.id).start).getMinutes())) - (new Date(tasks.find(a => a.id==b.id).start).getHours()+60*(new Date(tasks.find(a => a.id==b.id).start).getMinutes()))
    },
    {
        width: 20,
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
                console.log(1234)
                editTask(tasks.find(a => a.id==record.id));
            }
            const takeTasks=() =>{
                console.log(1234)
                tasksinfolder(record)
            }
            const createTasks=() =>{
                console.log(1234)
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
                                
export const TasksList = ({ reload, edit, tasks, usl,sort,tasksinfolder,independtid,findTaskdepend,tasksAll,documentId}) =>{
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [ tasks1, setTasks1 ] = useState([]);
    if (!localStorage.getItem("documentId")){
        getData(documentId).then(setTasks1);
    }
    else{
        getData(Number(localStorage.getItem("documentId"))).then(setTasks1);
    }
    const getTasksinFolder =(id)=>{return (tasks.filter(o => o.dependability===id[id.length - 1]))}
    let iddep=null
    if (independtid.length>0)
    {
        tasks=getTasksinFolder(independtid)
        iddep=independtid[independtid.length - 1]
    }
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const editTask = (record) => {   
        edit(record);
    }
    
    const dropAllTasks = (selectedRowKeys) =>{
        
        selectedRowKeys.forEach(id =>{
            let findtask=tasks.find(a => a.id===id);
            if (findtask!=undefined){
                if (findtask.type==="folder"){
                    dropAllTasks(selectedRowKeys.filter(a=> a.dependability===findtask.id))
                }
                deleteTask(findtask);
            }
            reload();
        })

    }
    
    const createAllTasks = (selectedRowKeys) => {
        
        console.log(tasks1)
        selectedRowKeys.forEach(id =>{
            let findtask=tasks1.find(a => a.id===id);
            if (findtask!=undefined){
                if (findtask.type==="folder"){
                    createAllTasks(selectedRowKeys.filter(a=> a.dependability===findtask.id))
                }
                delete findtask["id"]
                createTask({...findtask,
                    documentId: documentId,
                    time: [findtask.start,findtask.end]
                });
            }
        })
    }
    const decreateAllTasks =() =>{
        if (localStorage.getItem("selectedRowKeys")!==undefined){
            console.log(tasks1);
            getData(Number(localStorage.getItem("documentId"))).then(setTasks1);
            console.log(getData(Number(localStorage.getItem("documentId"))));
            console.log(tasks1);
            let mass = localStorage.getItem("selectedRowKeys");
            let temp = mass.split(",");
            console.log(temp);
            let mass2 =[];
            temp.forEach(a => {
                 mass2.push( Number(a))
            })
            console.log(mass2);
            createAllTasks(mass2);
            reload();
            
        }
        
        else {
            notification.error({
                message: `в буффере обмена нет элементов`,
                
                duration: 1.5
            });
        }

    }
    const dedropAllTasks =() =>{
        dropAllTasks(selectedRowKeys);
        
        
    }
    const decopy =() =>{
        console.log(selectedRowKeys)
        localStorage.setItem("selectedRowKeys",selectedRowKeys);
        localStorage.setItem("documentId",documentId);
        notification.success({
            message: `скопированно в буффер обмена`, 
            duration: 1.5
        });
    }

    return(
        <>
        <div className={styles.cont} >
            <Space.Compact block>
                <Button type="primary" onClick={decopy}>Копировать</Button>
                <Popconfirm 
                    title="Вы уверены, что хотите удалить выделенные элементы?"
                    onConfirm={dedropAllTasks}
                    okText="Да"
                    cancelText="Нет"
                >
                    <Button type="primary">Удалить      </Button>
                </Popconfirm>
                <Button type="primary">Изменить     </Button>
                <Button type="primary" onClick={decreateAllTasks}>Вставить     </Button>
            </Space.Compact>
            <Space.Compact block>
                <Input style={{ width: 'calc(100%)' }} defaultValue="найти по названию" />
                <Button type="primary"><SearchOutlined /></Button>
            </Space.Compact>
        </div>
        <Table
            showLine
            switcherIcon={<DownOutlined />}
            columns={columns(reload, edit,sort,tasksinfolder,tasks)}
            dataSource={(findTaskdepend(iddep,tasks.filter(o => o.dependability===iddep)))}
            onRow={(record) => {
                return {
                onDoubleClick: () => {
                    tasksinfolder(record.id);
                },
                };
            }}
            rowSelection={rowSelection}
        />
        
        </>
    )
}
