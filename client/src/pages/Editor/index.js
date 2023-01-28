import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from 'antd';
import { TasksList, listdeptasks} from "./TasksList";
import { getDocumentTasks } from "../../api/getDocumentTasks";
import { EditModal } from "../../components/EditModal";
import { getDocument } from "../../api/getDocumentByid"
import { Header } from "../../components/Header";
import { Preview } from './Preview';
import styles from './Editor.module.css';
import { Tree } from 'antd';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';
import { sort } from "./Sortscripts"
import { Form, Modal, notification, Select,TreeSelect } from 'antd';
import { DownOutlined } from '@ant-design/icons'
import { LeftOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import potrace from "potrace";

async function getData(id) {
    const result = await getDocumentTasks(id);
    return await result.json();
}

const { DirectoryTree } = Tree;

export const Editor = () => {
    const { id } = useParams();
    const [ tasks, setTasks ] = useState([]);
    const [ document, setDocument ] = useState(null)
    const [ editTask, setEditTask ] = useState(null);
    const [ type, setType ] = useState('id');
    const [ tasksdrawer , settasksdrawer ] = useState([])
    const [ independtid,setindependtid ]=useState([])
    const [ count,setcount ]=useState(1)
    const [ ,  ] = useState('id');
    const documentId = parseInt(id, 10);
    const createTask = () => setEditTask({});
    const closeEditModal = () => setEditTask(null);
    const onChange = () => {
    };
    const load = () => getData(documentId).then(setTasks);
    
    const tasksinfolder =(id)=> {
        if (tasks.find(task=>task.id===id).type==="folder"){
            independtid.push(id)     
        }
        else{
            independtid.push(tasks.find(task=>task.id===id).dependability)
        }
        setcount(count+1)
        setindependtid(independtid)
        console.log(independtid)
    }
    const deldep=()=>{
        independtid.pop()
        setcount(count+1)
        setindependtid(independtid)
    }
    const convertCanvasToImage=() => {
        var canvas = document.getElementById("para");
        var image = new Image();
       
        image.onload = function() {
          image.src = canvas.toDataURL("image/png");
          image.crossOrigin = "anonymous";
        }
        
        var trace = new potrace.Potrace();
 
        // You can also pass configuration object to the constructor
        trace.setParameters({
        threshold: 128,
        color: '#880000'
        });
        
        trace.loadImage(image, function(err) {
        if (err) throw err;
        
            trace.getSVG(); 
        } )
    }

    const onSelect = (df,any) => {
        tasksinfolder(any.node.value);
    };
    const finddepend=(id,tasksfolder)=>{
        try{
        let tasktree: DataType[]=[]
        
        let perem
        let n=tasksfolder.filter(
                o => o.type==="folder" && o.dependability===id
            )
        n.forEach(task=>{
                perem={
                    value : task.id,
                    title : task.title,
                    children: finddepend(
                        task.id,tasks.filter(o => o.dependability===task.id)
                    )
                }
                tasktree.push(perem)
            }
        )
        n=tasksfolder.filter(
            o=>o.type!=="folder"
            )
        n.forEach(task=>{
                perem={value : task.id,title : task.title}
                tasktree.push(perem)})
        
        let tasktreenew:DataType[]=tasktree
        return(tasktree)
        }
        catch{
            console.log("error")
        }
    }
    const findTaskdepend=(id,tasksfolder,count)=>{
        try{
        let tasktree=[]
        let perem
        let n=tasksfolder.filter(
                o => o.type==="folder" && o.dependability===id
            )
        n.forEach(task=>{
                perem={
                    key: task.id,
                    id : task.id,type : task.type,title: task.title,color:task.color,
                    children: findTaskdepend(
                        task.id,tasks.filter(o => o.dependability===task.id)
                    )
                }
                tasktree.push(perem)
            }
        )
        n=tasksfolder.filter(
            o=>o.type!=="folder"
            )
        n.forEach(task=>{
                perem={key: task.id,id : task.id,type : task.type,title: task.title,color:task.color}
                tasktree.push(perem)})
        return(tasktree)
        }
        catch{
            console.log("error")
        }
    }
    const datatreeupdate =(tasks) =>{
        let tasktree=finddepend(tasks)
        return tasktree
    }
    useEffect(() => {
        load();
    }, [type,count]);
    const [ form ] = Form.useForm();
    const buttongen =(name) =>{
        return(
            <>
                <Button>
                    {name}
                </Button>
            </> 
        )
    }
    useEffect(() =>{
        getDocument(documentId).then(response => {
            response.json().then(setDocument)
        });
    }, [ documentId ]);
    return(
        <>
            <script src="imagetracer_v1.2.6.js"></script>
            <Header document={document}>
                <Button type="primary" onClick={createTask}>
                    Добавить действие
                </Button>
                

            </Header>
            <div className="container" >
                <div className={styles.wrapper}>
                    <div className={styles.layout}>
                        <div  className={styles.col}>
                        {/* <TreeSelect
                            showSearch
                            style={{wight: 120}}
                            value={independtid[independtid.length - 1]}
                            dropdownStyle={{ maxHeight: 1000, overflow: 'auto' }}
                            placeholder="Please select"
                            allowClear
                            treeDefaultExpandAll
                            onChange={tasksinfolder}
                            treeData={}
                        /> */}
                        <DirectoryTree
                            showLine
                            switcherIcon={<DownOutlined />}
                            multiple
                            defaultExpandAll
                            onSelect={onSelect}
                            treeData={finddepend(null,tasks.filter(o => o.dependability===null))}
                        />
                        </div>
                        <div className={styles.col}>
                            
                            <TasksList
                                reload={load}
                                tasks={tasks}
                                edit={setEditTask}
                                usl={type}
                                sort={sort}
                                tasksinfolder={tasksinfolder}
                                independtid={independtid}
                                findTaskdepend={findTaskdepend}
                                documentId={documentId}

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