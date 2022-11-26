
export function drawTimeline(nach = 0, con = 350, typebackground=0) {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var len = con - nach;
    const sec = 1;
    const min = 60;
    const shrt = 4;
    if (typebackground===0){
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, 1000, con * sec + 50);
      ctx.strokeStyle = '#000000';
    }
    else{
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, 1000, con * sec + 50);
      ctx.strokeStyle = 'green';
    }
    // line
    ctx.beginPath();
    ctx.moveTo(25 + 60, 25);
    ctx.lineTo(25 + 60, len * sec + 25);
    ctx.closePath();
    ctx.stroke();
    //risk sec
    // for(var i=0;i<(con)-3-nach/sec;i+=1){
    //   ctx.beginPath();
    //   ctx.moveTo(25-shrt+60,25+i*sec);
    //   ctx.lineTo(25+shrt+60,25+i*sec);
    //   ctx.closePath();
    //   ctx.stroke();
    // }
    //megarisk sec
    for (var j = 0; j <= (con / min) - nach / min; j += 1) {
      ctx.beginPath();
      ctx.moveTo(25 - shrt * 2 + 60, 25 + j * min * sec);
      ctx.lineTo(25 + shrt * 2 + 60, 25 + j * min * sec);
      ctx.closePath();
      ctx.stroke();
      ctx.font = "17px sans-sherif"
      ctx.strokeText(j + ' min', 10 + shrt * 3, 25 + j * min * sec);
    }
    //strelka
    ctx.beginPath();
    ctx.moveTo(25 + 60, 25 + len * sec);
    ctx.lineTo(25 - 15 + 60, 25 + len * sec - 15);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(25 + 60, 25 + len * sec);
    ctx.lineTo(25 + 15 + 60, 25 + len * sec - 15);
    ctx.closePath();
    ctx.stroke();
  }
}
export function drawOperation(time1 = 10, time2 = 100, vlogh = 0) {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    const sec = 1;
    const a = 150
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(35 + 100 + a * vlogh, 25 + time1 * sec);
    ctx.lineTo(35 + 100 + a * vlogh, 25 + time2 * sec);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(31 + 100 + a * vlogh, 25 + time1 * sec);
    ctx.lineTo(39 + 100 + a * vlogh, 25 + time1 * sec);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(31 + 100 + a * vlogh, 25 + time2 * sec);
    ctx.lineTo(39 + 100 + a * vlogh, 25 + time2 * sec);
    ctx.closePath();
    ctx.stroke();
    //   ctx.fillRect();
  }
}
export function drawSquare(time1 = 20, txt = ' event', vlogh = 0,sam=1) {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    const sec = 1;
    const a = 150;
    let b = 50;
    if (sam ===1){
      b=0;
      vlogh+=1;
    }
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(35 + 60 + (vlogh-1)*(a)+b, 20 + time1 * sec);
    ctx.lineTo(51 + 60 + (vlogh-1)*(a)+b, 20 + time1 * sec);
    ctx.lineTo(51 + 60 + (vlogh-1)*(a)+b, 36 + time1 * sec);
    ctx.lineTo(35 + 60 + (vlogh-1)*(a)+b, 36 + time1 * sec);
    ctx.closePath();
    ctx.stroke()
    ctx.strokeText(txt, 50 + 60 + (vlogh-1)*(a)+b +10, 33 + time1 * sec);
  }
}
export function drawText(time1 = 20, txt = ' event', vlogh = 0, sam=1) {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    const sec = 1;
    const a = 150;
    let b = 50;
    if (sam ===1){
      b=0;
      vlogh+=1;
    }
    ctx.lineWidth = 1;
    ctx.strokeText(txt, 35 + 60+(vlogh-1)*(a)+b, 25 + time1 * sec);
  }
}