import React, { useEffect, useRef, useState } from "react";
import { Button, Space, Switch } from 'antd';
import {
    PlayCircleOutlined,
    PauseOutlined,
    RightOutlined,
    LeftOutlined,
    RedoOutlined,
    BgColorsOutlined
} from '@ant-design/icons';
import { Drawer } from '../../utils/drawer';
import { ColorButton } from "../../components/ColorButton";
import { dateToSeconds } from "../../utils/dateToSeconds";
import C2S from "canvas2svg";
import { Document, Packer } from "docx"
import { saveAs } from "file-saver"


import styles from './Editor.module.css';
import Paragraph from "antd/es/skeleton/Paragraph";


const CANVAS_WIDTH = 350 * 4;
const CANVAS_HEIGHT = 495 * 4;

const TIME_STEP = 1000;


export const drawer = new Drawer({
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
    const [ flagcolor, setFlagColor ] = useState(1);

    function generateWordDocument(FileSVG) {
        let doc = new Document({sections: [{children:[new Paragraph({children: [new Image({data:FileSVG,transformation:{width:CANVAS_WIDTH,height:CANVAS_HEIGHT}})]})]}]});
        // Call saveDocumentToFile with the document instance and a filename
        saveDocumentToFile(doc, "New Document.docx");
        
    }
    function saveDocumentToFile(doc, fileName) {
        
        const mimeType ="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        
        var a = window.document.createElement('a');
        //a.href = window.URL.createObjectURL(new Blob([doc], {type: mimeType}));
        // a.download = fileName;
        // document.body.appendChild(a);
        // a.click();
        // document.body.removeChild(a);

      }
    const convertCanvasToSVG = () =>{
        var canvasSVG=new C2S(CANVAS_WIDTH,CANVAS_HEIGHT);
        drawingall(canvasSVG);
        const textSvg = canvasSVG.getSerializedSvg();
        generateWordDocument(textSvg);
    }
    const inc = () => setStartTime(prev => {
        return prev + 35;
    });
    const dec = () => setStartTime(prev => {
        if(prev - 35 < 0) {
            return prev;
        }

        return prev - 35;
    });
    //useEffect({export let grafColornow=graphColor;})
    
    const clorflag =() =>setFlagColor(prev =>{
        if(prev===0){
            return 1;
        }
        return 0;
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

    function drawingall(canvasdrw){

        drawer.setContext(canvasdrw);
        drawer.setBackgroundColor(bgColor)
        drawer.setFlagColor(flagcolor)
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
                    drawer.drawSquare(startTotal, task.title, task.depth,20,task.color)}
                else{
                    drawer.drawSquare(startTotal, task.title, task.depth,-23,task.color)
                }
            }
             if (task.type === 'operation'){
                const { start , end } = task;
                const startTotal = dateToSeconds(start);
                const endTotal = dateToSeconds(end);
                drawer.drawOperation(startTotal,endTotal,task.depth, task.title,task.color);
            }
            if (task.type==='inform'){
                const { start } = task;
                const startTotal = dateToSeconds(start);
                if  (checkIsChildren(tasks,startTotal,task.depth)===true){
                    drawer.drawinform(startTotal,task.title,task.depth,50,task.color)
                }
                else{
                    drawer.drawinform(startTotal,task.title,task.depth,0,task.color)
                }
            }
            if (task.type==='instruction'){
                const { start } = task;
                const startTotal = dateToSeconds(start);
                if  (checkIsChildren(tasks,startTotal,task.depth)===true){
                    drawer.drawText(startTotal,task.title,task.depth,50,task.color)
                }
                else{
                    drawer.drawText(startTotal,task.title,task.depth,0,task.color)
                }
            }
        });
        drawer.drawProgress(progress);
        
    };
    const drawingallfnc= () =>{
        drawingall(ref.current?.getContext('2d'))
    }
    useEffect(drawingallfnc, [ ref, tasks, progress, startTime, bgColor, graphColor, flagcolor ])


    return(
        <>
        <Button type="primary" onClick={convertCanvasToSVG}>
            Сохранить в SVG файл
        </Button>
            <div className={styles.control}>

                <ColorButton onChange={setBgColor} value={bgColor}>
                    Цвет фона
                </ColorButton>
                <ColorButton onChange={setGraphColor} value={graphColor}>
                    Цвет графики
                </ColorButton>

                <div>
                    <Space>
                        <BgColorsOutlined />

                        <Switch onClick={clorflag}>

                        </Switch>
                    </Space>
                </div>
            </div>
           
            <canvas
                id="para"
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