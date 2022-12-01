const FONT_SIZE = 38;
const INDENT = 50;
const INDENT_TOP = INDENT * 1.5;
const INDENT_LEFT = INDENT * 3.5;
const SMALL_DASH_LEN = 10;
const SMALL_DASHES_DISTANSE = INDENT;

const FIRST_LEVEL_INDENT = INDENT_LEFT * 1.7;

const SQUARE_SIDE = 30;

const SMALL_INDENT = 20;

const DEPTH_INDENT = 7 * INDENT;

const FONT_FAMILY = 'Calibri';

const DASHES_PER_PAGE = 35;

export class Drawer {
  bgColor = '#FFFFFF'
  graphColor = '#000000'
  textColor = '#000000'
  context
  settings = {}
  valueOfDivision
  constructor({ 
    canvas, 
    width, 
    height,
    start = 0
  }) {
    if(canvas) {
      this.context = canvas.getContext('2d');
    }
    this.settings = {
      width, height
    }
  }
  setBackgroundColor(color) {
    this.bgColor = color;
    }
  setGraphicColor(color) {
    this.bgColor = color;
    }
  setStartTime(time) {
    this.settings.start = time;
  }
  getOffset(time = 0) {
    return INDENT_TOP + time / 60 * SMALL_DASHES_DISTANSE;
  }
  setContext(canvas) {
    this.context = canvas.getContext('2d');
  }
  drawBackground(bgColor = '#000000') {
    this.context.fillStyle = bgColor;
    this.context.fillRect(0, 0, this.settings.width, this.settings.height);
  }
  drawTimeline(color = '#FFFFFF')  {
    const { start } = this.settings;
    this.context.lineWidth = 2;
    // рисуем линию
    const lineLength = DASHES_PER_PAGE * SMALL_DASHES_DISTANSE;
    this.context.strokeStyle = color;
    this.context.beginPath();
    this.context.moveTo(INDENT_LEFT, INDENT_TOP);
    this.context.lineTo(INDENT_LEFT, INDENT_TOP + lineLength);
    this.context.closePath();
    this.context.stroke();
    
    // рисуем рисочки
    for (let j = 0; j <= DASHES_PER_PAGE; j++) {
      let len = SMALL_DASH_LEN / 2;
      this.context.lineWidth = 2;
      if(j % 5 === 0) {
        this.context.lineWidth = 5;
        len = SMALL_DASH_LEN;
      }
      this.context.beginPath();
      this.context.moveTo(INDENT_LEFT - len,  INDENT_TOP + j * SMALL_DASHES_DISTANSE);
      this.context.lineTo(INDENT_LEFT + len,  INDENT_TOP + j * SMALL_DASHES_DISTANSE);
      this.context.closePath();
      this.context.stroke();
    }

    // рисуем подписи
    this.context.fillStyle = "#000000";
    this.context.font = `bold ${FONT_SIZE}px ${FONT_FAMILY}`;
    for (let j = 0; j <= DASHES_PER_PAGE; j += 5) {
      const textOffsetY = INDENT_TOP + (j + 1) * SMALL_DASHES_DISTANSE - FONT_SIZE;
      const hours = Math.floor(( start + j ) / 60).toString().padStart(2, '0');
      const minutes = ((start + j) % 60).toString().padStart(2, '0');
      const text = `${hours}:${minutes}`;
      this.context.fillText(text, INDENT, textOffsetY);
    }
    this.valueOfDivision = lineLength / DASHES_PER_PAGE;
    console.log(this.valueOfDivision)
  }
  drawOperation(start = 10, end = 100, depth = 0, text, color = this.graphColor) {
    this.context.lineWidth = 3;
    const startY = this.getOffset(start)- this.settings.start * SMALL_DASHES_DISTANSE;
    const endY = this.getOffset(end)- this.settings.start * SMALL_DASHES_DISTANSE;
    const offsetLeft = SMALL_DASH_LEN + depth * DEPTH_INDENT;
    this.context.strokeStyle = color;

    //линия
    this.context.beginPath();
    this.context.moveTo(offsetLeft + FIRST_LEVEL_INDENT-SMALL_DASH_LEN*2, startY);
    this.context.lineTo(offsetLeft + FIRST_LEVEL_INDENT-SMALL_DASH_LEN*2, endY);
    this.context.closePath();
    this.context.stroke();

    this.context.lineWidth = 5;

    // риска начала
    this.context.beginPath();
    this.context.moveTo(offsetLeft + FIRST_LEVEL_INDENT - SMALL_DASH_LEN-SMALL_DASH_LEN*2,  startY);
    this.context.lineTo(offsetLeft + FIRST_LEVEL_INDENT + SMALL_DASH_LEN-SMALL_DASH_LEN*2,  startY);
    this.context.closePath();
    this.context.stroke();

    // риска конца
    this.context.beginPath();
    this.context.moveTo(offsetLeft + FIRST_LEVEL_INDENT - SMALL_DASH_LEN-SMALL_DASH_LEN*2,  endY);
    this.context.lineTo(offsetLeft + FIRST_LEVEL_INDENT + SMALL_DASH_LEN-SMALL_DASH_LEN*2,  endY);
    this.context.closePath();
    this.context.stroke();

    // текст-подпись
    this.context.save();
    this.context.translate(offsetLeft + FIRST_LEVEL_INDENT - FONT_SIZE - SMALL_INDENT-SMALL_DASH_LEN*2, (startY + endY) / 2);
    this.context.fillStyle = "#000000";
    this.context.font = `bold ${FONT_SIZE}px ${FONT_FAMILY}`;
    this.context.textAlign = 'center';
    this.context.rotate(-Math.PI/2);
    this.context.fillText(text, 0, FONT_SIZE);
    this.context.restore();
  }
  drawSquare(time = 720, txt = 'Это был я - ДИО', depth, k = 0, color = this.graphColor){
    
    const offset = this.getOffset(time) - SQUARE_SIDE / 2 - this.settings.start * SMALL_DASHES_DISTANSE;
    this.context.lineWidth = 3;
    this.context.fillStyle = '#000000';
    this.context.strokeStyle = color;
    this.context.font = `bold ${FONT_SIZE - 4}px ${FONT_FAMILY}`;
    this.context.strokeRect(FIRST_LEVEL_INDENT+ depth * DEPTH_INDENT+k, offset, SQUARE_SIDE, SQUARE_SIDE);
    this.context.fillText(txt, FIRST_LEVEL_INDENT + depth * DEPTH_INDENT + SQUARE_SIDE + SMALL_INDENT+k, offset + FONT_SIZE - 12);
  }
  drawText(time = 20, txt = ' event', depth = 0,k=0, color = this.graphColor) {
    this.context.fillStyle = '#000000';
    this.context.strokeStyle = color;
    const offset = this.getOffset(time)+FONT_SIZE/2-10- this.settings.start * SMALL_DASHES_DISTANSE;
    this.context.fillText(txt,FIRST_LEVEL_INDENT + depth * DEPTH_INDENT+k-(INDENT/2), offset);

  }
  drawinform(time = 20, txt = ' event', depth = 0,k=0, color = this.graphColor) {
    const textWidth = txt.length * (FONT_SIZE - 4) / 2;
    this.context.fillStyle = '#000000';
    this.context.strokeStyle = color;
    const offset = this.getOffset(time) - SQUARE_SIDE / 2- this.settings.start * SMALL_DASHES_DISTANSE;
    this.context.font = `bold ${FONT_SIZE - 4}px ${FONT_FAMILY}`;
    this.context.setLineDash([6]);
    this.context.strokeRect(FIRST_LEVEL_INDENT + depth * DEPTH_INDENT + textWidth + SMALL_INDENT-(INDENT/2)-10+k, offset, SQUARE_SIDE*3, SQUARE_SIDE)
    this.context.fillText(txt,FIRST_LEVEL_INDENT + depth * DEPTH_INDENT-(INDENT/2)+k, offset + FONT_SIZE - 12);
    this.context.setLineDash([]);
  }
}
