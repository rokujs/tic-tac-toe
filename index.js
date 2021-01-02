const canvas = document.getElementById("myCanvas");
const brush = canvas.getContext("2d");


function start() {
  const pointStart = 166;
  brush.beginPath();
  brush.lineWidth = 5;
  brush.lineCap = 'round';
  brush.strokeStyle = "#3B50D9";
  brush.moveTo(pointStart, 0);
  brush.lineTo(pointStart, 500);
  brush.closePath();
  brush.stroke();
  brush.beginPath();
  brush.moveTo(pointStart * 2, 0);
  brush.lineTo(pointStart * 2, 500);
  brush.closePath();
  brush.stroke();
  brush.beginPath();
  brush.moveTo(0, pointStart);
  brush.lineTo(500, pointStart);
  brush.closePath();
  brush.stroke();
  brush.beginPath();
  brush.moveTo(0, pointStart * 2);
  brush.lineTo(500, pointStart * 2);
  brush.closePath();
  brush.stroke();
}

function circle(x, y) {
  brush.beginPath();
  brush.lineWidth = 7;
  brush.strokeStyle = "#eee";
  brush.arc(x, y, 50, 0, Math.PI * 2, true);
  brush.stroke();
}

function equis(x, y) {
  const lineLength = 40;
  brush.beginPath();
  brush.lineWidth = 7;
  brush.strokeStyle = "#333";
  brush.moveTo(x - lineLength, y - lineLength);
  brush.lineTo(x + lineLength, y + lineLength);
  brush.moveTo(x - lineLength, y + lineLength);
  brush.lineTo(x + lineLength, y - lineLength);
  brush.stroke();
}


start();
circle(250,250);
equis(250, 250);