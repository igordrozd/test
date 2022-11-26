const INDENT = 50;
const INDENT_TOP = INDENT;
const INDENT_BOTTOM = INDENT;
const INDENT_LEFT = INDENT;
const INDENT_RIGHT = INDENT;

const LEN_LINE = 1800;
const SMALL_DASH_LEN = 12;
const SMALL_DASHES_DISTANSE = INDENT;

const MEGA_SUPER_LONG_INDENT_LEFT = 4 * INDENT_LEFT
const NOT_SO_MEGA_LONG_INDENT_LEFT = 1.5*INDENT_LEFT

export class Drawer {
  context
  settings = {}
  constructor({ 
    canvas, 
    width, 
    height
  }) {
    if(canvas) {
      this.context = canvas.getContext('2d');
    }
    this.settings = {
      width, height
    }
  }
  setContext(canvas) {
    this.context = canvas.getContext('2d');
  }
  drawBackground(bgColor = '#000000') {
    this.context.fillStyle = bgColor;
    this.context.fillRect(0, 0, this.settings.width, this.settings.height);
  }
  drawTimeline(start = 0, end = 1800, color = '#FFFFFF')  {
    // рисуем линию
    const lineLength = this.settings.height - (INDENT_BOTTOM + INDENT_TOP);
    const dashesCount = Math.floor(lineLength / SMALL_DASHES_DISTANSE);
    this.context.strokeStyle = color;
    this.context.beginPath();
    this.context.moveTo(INDENT_LEFT+SMALL_DASH_LEN, INDENT_TOP);
    this.context.lineTo(INDENT_LEFT+SMALL_DASH_LEN, lineLength);
    this.context.closePath();
    this.context.stroke();
    
    // рисуем рисочки
    for (let j = 1; j <= dashesCount; j++) {
      this.context.beginPath();
      this.context.moveTo(INDENT_LEFT+SMALL_DASH_LEN - SMALL_DASH_LEN / 2, j * SMALL_DASHES_DISTANSE);
      this.context.lineTo(INDENT_LEFT+SMALL_DASH_LEN + SMALL_DASH_LEN / 2, j * SMALL_DASHES_DISTANSE);
      this.context.closePath();
      this.context.stroke();
    }

    // рисуем подписи
    this.context.font = "14pt sans-sherif"
    for (let j = 1; j <= dashesCount; j += 5) {
      const text = Math.floor((j-1)/60) + ':' + (j-1) % 60;
      this.context.strokeText(text, SMALL_DASH_LEN, INDENT_TOP + j * SMALL_DASHES_DISTANSE - 35 );
    }
  }
  drawOperation(time1 = 10, time2 = 100, vlogh = 0) {
    this.context.lineWidth = 1;
    this.context.beginPath();
    this.context.moveTo(NOT_SO_MEGA_LONG_INDENT_LEFT + MEGA_SUPER_LONG_INDENT_LEFT * (0.7)*(vlogh-1), INDENT_TOP + time1);
    this.context.lineTo(NOT_SO_MEGA_LONG_INDENT_LEFT + MEGA_SUPER_LONG_INDENT_LEFT * (0.7)*(vlogh-1), INDENT_TOP + time2);
    this.context.closePath();
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(NOT_SO_MEGA_LONG_INDENT_LEFT + MEGA_SUPER_LONG_INDENT_LEFT * (0.7)*(vlogh-1) - SMALL_DASH_LEN/2, INDENT_TOP + time1);
    this.context.lineTo(NOT_SO_MEGA_LONG_INDENT_LEFT + MEGA_SUPER_LONG_INDENT_LEFT * (0.7)*(vlogh-1) + SMALL_DASH_LEN/2, INDENT_TOP + time1);
    this.context.closePath();
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(NOT_SO_MEGA_LONG_INDENT_LEFT + MEGA_SUPER_LONG_INDENT_LEFT * (0.7)*(vlogh-1) - SMALL_DASH_LEN/2, INDENT_TOP + time2);
    this.context.lineTo(NOT_SO_MEGA_LONG_INDENT_LEFT + MEGA_SUPER_LONG_INDENT_LEFT * (0.7)*(vlogh-1) + SMALL_DASH_LEN/2, INDENT_TOP + time2);
    this.context.closePath();
    this.context.stroke();
  }
  drawSquare(time1 = 720, txt = 'Это был я - ДИО', vlogh = 1 ,sam=1){
    const sec = 1;
    let b = 1
    if (sam ===1){
      b=0.5;
      vlogh+=1;
    }
    this.context.lineWidth = 1;
    this.context.beginPath();
    this.context.moveTo(((vlogh-1))*(MEGA_SUPER_LONG_INDENT_LEFT)+NOT_SO_MEGA_LONG_INDENT_LEFT-SMALL_DASH_LEN/2+INDENT_TOP, INDENT_TOP - SMALL_DASH_LEN/2 + time1*INDENT/60);
    this.context.lineTo(((vlogh-1))*(MEGA_SUPER_LONG_INDENT_LEFT)+NOT_SO_MEGA_LONG_INDENT_LEFT+SMALL_DASH_LEN/2+INDENT_TOP, INDENT_TOP - SMALL_DASH_LEN/2 + time1*INDENT/60);
    this.context.lineTo(((vlogh-1))*(MEGA_SUPER_LONG_INDENT_LEFT)+NOT_SO_MEGA_LONG_INDENT_LEFT+SMALL_DASH_LEN/2+INDENT_TOP, INDENT_TOP + SMALL_DASH_LEN/2 + time1*INDENT/60);
    this.context.lineTo(((vlogh-1))*(MEGA_SUPER_LONG_INDENT_LEFT)+NOT_SO_MEGA_LONG_INDENT_LEFT-SMALL_DASH_LEN/2+INDENT_TOP, INDENT_TOP + SMALL_DASH_LEN/2 + time1*INDENT/60);
    this.context.closePath();
    this.context.stroke()
    this.context.strokeText(txt, ((vlogh-1))*(MEGA_SUPER_LONG_INDENT_LEFT)+NOT_SO_MEGA_LONG_INDENT_LEFT +10+INDENT_TOP, INDENT_TOP + time1*INDENT/60+4);
  }
  drawText(time1 = 20, txt = ' event', vlogh = 1, sam=1) {
    this.context.strokeText(txt, ((0.7)*(vlogh-1))*(MEGA_SUPER_LONG_INDENT_LEFT)+NOT_SO_MEGA_LONG_INDENT_LEFT+INDENT_TOP, INDENT_TOP + time1*INDENT/60+4);
}
}