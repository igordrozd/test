import React, { useEffect, useRef, useState } from "react";
import { Button } from 'antd';
import {
    RightOutlined,
    LeftOutlined
} from '@ant-design/icons';
import { Drawer } from '../../utils/drawer';
import { dateToSeconds } from "../../utils/dateToSeconds";
import styles from './Editor.module.css';

const CANVAS_WIDTH = 350 * 4;
const CANVAS_HEIGHT = 495 * 4;

const drawer = new Drawer({
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT
});

export const Preview = ({ tasks })=> {
    
    const ref = useRef(null);
    
    const [ startTime, setStartTime ] = useState(0);
    const inc = () => setStartTime(prev => {
        console.log(prev); 
        return prev + 35;
    });
    const dec = () => setStartTime(prev => {
        console.log(prev);
        if(prev - 35 < 0) {
            return prev;
        }

        return prev - 35;
    });
    console.log(startTime);
    const [ progress, setProgress ] = useState(0);
    
// изменение данных
    
    const [ timer, setTimer  ] = useState(null);
    function drawingbar(flag){
        if (flag===1){
            const timer1 = setInterval(() => {
                
                setProgress(prev =>  prev+5);
            }, 50);
            setTimer(timer1)
            
        }
        
        if (flag===0){   
            
            clearInterval(timer);     
            setProgress(prev => prev=0);
            drawingall();
            return;
        }

        
                
    }
    
    const flagf =() => {drawingbar(1)}
    const deflagf =() => {drawingbar(0)}
    
    

//отрисовка
    useEffect(() => {
        drawer.setProgress(progress)
        drawer.setContext(ref.current);
        drawer.drawProgress();
   
    }, [ progress, startTime]);

    
    function drawingall(){
        console.log(startTime)
        drawer.setStartTime(startTime);
        drawer.setContext(ref.current);
        drawer.drawBackground('#FFFFFE');
        drawer.drawTimeline('#000000');
        tasks.forEach(task => {
            const { start } = task;
            const startTotal = dateToSeconds(start);
            if (startTotal/60<startTime || startTotal/60>startTime+35*60) {
                return;
            }
            if (task.type === 'event'){
                const { start } = task;
                const startTotal = dateToSeconds(start);
                if  (checkIsChildren(tasks,startTotal,task.depth)===true){
                    drawer.drawSquare(startTotal, task.title, task.depth,20)}
                else{
                    drawer.drawSquare(startTotal, task.title, task.depth,-23)
                }
            }
             if (task.type === 'operation'){
                const { start , end } = task;
                const startTotal = dateToSeconds(start);
                const endTotal = dateToSeconds(end);
                drawer.drawOperation(startTotal,endTotal,task.depth, task.title);
            }
            if (task.type==='inform'){
                const { start } = task;
                const startTotal = dateToSeconds(start);
                if  (checkIsChildren(tasks,startTotal,task.depth)===true){
                    drawer.drawinform(startTotal,task.title,task.depth,50)
                }
                else{
                    drawer.drawinform(startTotal,task.title,task.depth,0)
                }  
            }
            if (task.type==='instruction'){
                const { start } = task;
                const startTotal = dateToSeconds(start);
                if  (checkIsChildren(tasks,startTotal,task.depth)===true){
                    drawer.drawText(startTotal,task.title,task.depth,50)
                }
                else{
                    drawer.drawText(startTotal,task.title,task.depth,0)
                }  
            }
        }); 
    };
    useEffect(() => {drawingall();drawingall()}, [ ref, tasks,startTime ])

    return(
        <>
            <canvas
                ref={ref}
                width={CANVAS_WIDTH} 
                height={CANVAS_HEIGHT}
                className={styles.canvas}
            />
            <div className={styles.control}>
                <Button onClick={dec} disabled={!startTime}>
                    <LeftOutlined />
                </Button>
                <Button onClick={inc}>
                    <RightOutlined />
                </Button>
                <Button onClick={flagf}>
                    запуск
                </Button>
                <Button onClick={deflagf}>
                    попуск
                </Button>
            </div>
        </>
    );
}
function checkIsChildren(tasks,startTotal,depth){
    let flag=false
    tasks.forEach(taskv =>{
        if (taskv.type==='operation'){
            const { start,end } = taskv;
            const startTotal1 = dateToSeconds(start);
            const endTotal1 = dateToSeconds(end);
            if (startTotal1<=startTotal &&  endTotal1>=startTotal && taskv.depth===depth){
                flag=true;
            }
        }
    })
    return flag
}