import React, { useEffect, useRef, useState } from "react";
import { Button, Switch } from 'antd';
import { Drawer } from '../../utils/drawer';
import { dateToSeconds } from "../../utils/dateToSeconds";
import styles from './Editor.module.css';
import { setTwoToneColor } from "@ant-design/icons";
const CANVAS_WIDTH = 350 * 4;
const CANVAS_HEIGHT = 495 * 4;

const drawer = new Drawer({
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT
});

export const Preview = ({ tasks })=> {

    const ref = useRef(null);
    const [ startTime, setStartTime ] = useState(0);
    const inc = () => setStartTime(prev => prev + 35);
    const dec = () => setStartTime(prev => prev - 35);
    // const [ color, changeColor ] = useState(0);
    // const colorBlack = () => changeColor(prev = 0);
    // const colorWhite = () => changeColor(prev = 1);
    useEffect(() => {
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
    }, [ ref, tasks, startTime ]);
    return(
        <>
            <canvas
                ref={ref}
                width={CANVAS_WIDTH} 
                height={CANVAS_HEIGHT}
                className={styles.canvas}
            />
            <Button onClick={dec}>{`<`}</Button>
            <Button onClick={inc}>{'>'}</Button>
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