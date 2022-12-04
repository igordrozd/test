import React, { useEffect, useRef, useState } from "react";
import { Button } from 'antd';
import {
    PlayCircleOutlined,
    PauseOutlined,
    RightOutlined,
    LeftOutlined,
    RedoOutlined
} from '@ant-design/icons';
import { Drawer } from '../../utils/drawer';
import { ColorButton } from "../../components/ColorButton";
import { dateToSeconds } from "../../utils/dateToSeconds";

import styles from './Editor.module.css';


const CANVAS_WIDTH = 350 * 4;
const CANVAS_HEIGHT = 495 * 4;

const TIME_STEP = 1000;


const drawer = new Drawer({
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT
});

export const Preview = ({ tasks })=> {

    const ref = useRef(null);

    const [ startTime, setStartTime ] = useState(0);
    const [ timer, setTimer  ] = useState(null);
    const [ progress, setProgress ] = useState(0);
    const [ bgColor, setBgColor ] = useState('#FFFFFF');
    const [ graphColor, setGraphColor] = useState('#000000');

    const inc = () => setStartTime(prev => {
        return prev + 35;
    });
    const dec = () => setStartTime(prev => {
        if(prev - 35 < 0) {
            return prev;
        }

        return prev - 35;
    });


    const start = () => {
        if(timer) {
            return;
        }
        const interval = setInterval(() => {
            setProgress(prev => {
                return prev + 1;
            });
        }, TIME_STEP);
        setTimer(interval);
    }
    const stop = () => {
        if(!timer) {
            return;
        }
        clearInterval(timer);
        setTimer(null);
    }
    const clear = () => {
        stop();
        setProgress(0);
    }

    function drawingall(){
        drawer.setContext(ref.current);
        drawer.setBackgroundColor(bgColor)
        drawer.setGraphicColor(graphColor)
        drawer.setStartTime(startTime);
        drawer.drawBackground(bgColor);
        drawer.drawTimeline(graphColor);

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
        drawer.drawProgress(progress);
    };
    useEffect(drawingall, [ ref, tasks, progress, startTime, bgColor, graphColor ])


    return(
        <>
            <div className={styles.control}>
                <ColorButton onChange={setBgColor} value={bgColor}>
                    Цвет фона
                </ColorButton>
                <ColorButton onChange={setGraphColor} value={graphColor}>
                    Цвет графики
                </ColorButton>
            </div>
            <canvas
                ref={ref}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className={styles.canvas}
            />
            <div className={styles.footer}>
                <Button onClick={dec} disabled={!startTime}>
                    <LeftOutlined />
                </Button>
                {/*  */}
                {timer ? (
                    <Button onClick={stop}>
                        <PauseOutlined />
                    </Button>
                ) : (
                    <Button onClick={start} disabled={timer}>
                        <PlayCircleOutlined />
                    </Button>
                )}
                <Button onClick={clear}>
                    <RedoOutlined />
                </Button>
                {/*  */}
                <Button onClick={inc}>
                    <RightOutlined />
                </Button>
            </div>
        </>
    );
}


function checkIsChildren(tasks,startTotal,depth){
    let flag = false
    tasks.forEach(taskv =>{
        if (taskv.type==='operation'){
            const { start,end } = taskv;
            const startTotal1 = dateToSeconds(start);
            const endTotal1 = dateToSeconds(end);
            if (startTotal1<=startTotal &&  endTotal1>=startTotal && taskv.depth===depth){
                flag = true;
            }
        }
    })
    return flag
}