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
    const inc = () => setStartTime(prev => prev + 35);
    const dec = () => setStartTime(prev => {
        if(prev - 35 < 0) {
            return prev;
        }
        return prev - 35;
    });

    const blackTheme = () => {
        setBgColor('#000000'); //000000
        setGraphColor('#00ce22'); //00ce22
        setTextColor('#123456'); //00ce22
        }
    const whiteTheme = () => {
        setBgColor('#FFFFFF'); //FFFFFE
        setGraphColor('#000000'); //000000
        setTextColor('#123456'); //000000
        }

    const [ bgColor, setBgColor ] = useState('#FFFFFF');
    const [ graphColor, setGraphColor] = useState('#000000');
    const [ textColor, setTextColor] = useState('#000000')
    useEffect(() => {
        drawer.setStartTime(startTime);
        drawer.setContext(ref.current);
        drawer.drawBackground(bgColor);
        drawer.drawTimeline(graphColor);
        drawer.drawOperation(textColor);
        drawer.drawSquare(textColor);
        drawer.drawText(textColor);
        drawer.drawinform(textColor)
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
    }, [ ref, tasks, startTime, bgColor, graphColor, textColor ]);
    return(
        <>
            <canvas
                ref={ref}
                width={CANVAS_WIDTH} 
                height={CANVAS_HEIGHT}
                className={styles.canvas}
            />
            <div className={styles.control}>
                <Button onClick={ blackTheme }>
                    Тёмная тема
                </Button>
                <Button onClick={ whiteTheme }>
                    Светлая тема
                </Button>
                <Button onClick={dec} disabled={!startTime}>
                    <LeftOutlined />
                </Button>
                <Button onClick={inc}>
                    <RightOutlined />
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