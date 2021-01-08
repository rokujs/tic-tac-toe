const canvas = document.getElementById("myCanvas");
const brush = canvas.getContext("2d");
let turn = false;
let board = [true, true, true];
const boxPos = [{ id: 1, sx: 0, sy: 0, ex: 166, ey: 166, active: false },
{ id: 2, sx: 166, sy: 0, ex: 332, ey: 166, active: false },
{ id: 3, sx: 332, sy: 0, ex: 500, ey: 166, active: false },
{ id: 4, sx: 0, sy: 166, ex: 166, ey: 332, active: false },
{ id: 5, sx: 166, sy: 166, ex: 332, ey: 332, active: false },
{ id: 6, sx: 332, sy: 166, ex: 500, ey: 332, active: false },
{ id: 7, sx: 0, sy: 332, ex: 166, ey: 500, active: false },
{ id: 8, sx: 166, sy: 332, ex: 332, ey: 500, active: false },
{ id: 9, sx: 332, sy: 332, ex: 500, ey: 500, active: false }
]


start();

// Event that catches the click to select the box
canvas.addEventListener("click", (ev) => {
  const mousePos = getMousePos(ev);
  boxActive(mousePos);
});

function start() {
  board.length = 9;
  board.fill(false);

  const pointStart = 166;
  brush.beginPath();
  brush.lineWidth = 7;
  brush.lineCap = 'round';
  brush.strokeStyle = "#3B50D9";
  brush.moveTo(pointStart, 10);
  brush.lineTo(pointStart, 490);
  brush.stroke();
  brush.beginPath();
  brush.moveTo(pointStart * 2, 10);
  brush.lineTo(pointStart * 2, 490);
  brush.stroke();
  brush.beginPath();
  brush.moveTo(10, pointStart);
  brush.lineTo(490, pointStart);
  brush.stroke();
  brush.beginPath();
  brush.moveTo(10, pointStart * 2);
  brush.lineTo(490, pointStart * 2);
  brush.stroke();
}

function createCircle(x, y) {
  brush.beginPath();
  brush.lineWidth = 7;
  brush.strokeStyle = "#eee";
  brush.arc(x, y, 50, 0, Math.PI * 2, true);
  brush.stroke();
}

function createX(x, y) {

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


function getMousePos(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}



function boxActive(mousePos) {
  const { x, y } = mousePos;
  let invokePos = { x: 0, y: 0 };
  let invoke = false;

  for (const box of boxPos) {
    if (box.sx < x && box.ex > x && box.sy < y && box.ey > y && !box.active) {
      box.active = true;
      invoke = true;
      switch (box.id) {
        case 1:
          invokePos.x = 83;
          invokePos.y = 83;
          break;
        case 2:
          invokePos.x = 250;
          invokePos.y = 83;
          break;
        case 3:
          invokePos.x = 416;
          invokePos.y = 83;
          break;
        case 4:
          invokePos.x = 83;
          invokePos.y = 250;
          break;
        case 5:
          invokePos.x = 250;
          invokePos.y = 250;
          break;
        case 6:
          invokePos.x = 416;
          invokePos.y = 250;
          break;
        case 7:
          invokePos.x = 83;
          invokePos.y = 416;
          break;
        case 8:
          invokePos.y = 416;
          invokePos.x = 250;
          break;
        case 9:
          invokePos.y = 416;
          invokePos.x = 416;
          break;
      }
      console.log(boxPos)
      break;
    }
  }

  if (invoke) {
    turn ? createX(invokePos.x, invokePos.y) : createCircle(invokePos.x, invokePos.y);

    for (const box of boxPos) {
      if (!box.active) {
        break;
      }
      if(box.id === 9) {
        tie();
      }
    }
    win(turn);
    turn = !turn;
  }

}

function win(player) {
  // true == x false = circle

  for (let i = 0; i < boxPos.length; i += 3) {
    if (boxPos[i].active && boxPos[i + 1].active && boxPos[i + 2].active) {
      console.log(1);
    }
  }

  for (let i = 0; i < 3; i++) {
    if (boxPos[i].active && boxPos[i + 3].active && boxPos[i + 6].active) {
      console.log(2);
    }
  }

  for (let i = 0; i < 3; i += 2) {
    if (boxPos[0 + i].active && boxPos[4].active && boxPos[8 - i].active) {
      console.log(3);
    }
  }
}

function tie() {
  console.log("Empate")
}
