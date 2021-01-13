let canvas = document.getElementById("myCanvas");
let brush = canvas.getContext("2d");

let turn = false;
let boxPos;

let playerX;
let playerO;


// Event that catches the click to select the box
canvas.addEventListener("click", (ev) => {
  const mousePos = getMousePos(ev);
  boxActive(mousePos);
});

function start() {
  boxPos = [{ id: 1, sx: 0, sy: 0, ex: 166, ey: 166, active: false, type: 2 },
  { id: 2, sx: 166, sy: 0, ex: 332, ey: 166, active: false, type: 2 },
  { id: 3, sx: 332, sy: 0, ex: 500, ey: 166, active: false, type: 2 },
  { id: 4, sx: 0, sy: 166, ex: 166, ey: 332, active: false, type: 2 },
  { id: 5, sx: 166, sy: 166, ex: 332, ey: 332, active: false, type: 2 },
  { id: 6, sx: 332, sy: 166, ex: 500, ey: 332, active: false, type: 2 },
  { id: 7, sx: 0, sy: 332, ex: 166, ey: 500, active: false, type: 2 },
  { id: 8, sx: 166, sy: 332, ex: 332, ey: 500, active: false, type: 2 },
  { id: 9, sx: 332, sy: 332, ex: 500, ey: 500, active: false, type: 2 }
  ];
  turn = false;

  playerX = document.querySelector("#p1").value;
  playerO = document.querySelector("#p2").value;
  console.log(playerX);

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

function restart() {
  const modal = document.querySelector(".modal");
  canvas = document.getElementById("myCanvas");
  brush = canvas.getContext("2d");

  brush.clearRect(0, 0, canvas.width, canvas.height);
  modal.remove();
  start();
  console.log(boxPos);
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
      box.type = turn ? 1 : 0;
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
      break;
    }
  }

  if (invoke) {
    turn ? createX(invokePos.x, invokePos.y) : createCircle(invokePos.x, invokePos.y);

    for (const box of boxPos) {
      if (!box.active) {
        break;
      }
      if (box.id === 9) {
        tie();
      }
    }
    win(turn);
    turn = !turn;
  }

}

function win(turn) {
  // true == x false = circle
  const player = turn ? "x" : "circle";
  let result = false;


  for (let i = 0; i < boxPos.length; i += 3) {
    if (boxPos[i].active && boxPos[i + 1].active && boxPos[i + 2].active) {
      if (boxPos[i].type === boxPos[i + 1].type && boxPos[i].type === boxPos[i + 2].type) {
        result = true;
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    if (boxPos[i].active && boxPos[i + 3].active && boxPos[i + 6].active) {
      if (boxPos[i].type === boxPos[i + 3].type && boxPos[i].type === boxPos[i + 6].type) {
        result = true;
      }
    }
  }

  for (let i = 0; i < 3; i += 2) {
    if (boxPos[0 + i].active && boxPos[4].active && boxPos[8 - i].active) {
      if (boxPos[0 + i].type === boxPos[4].type && boxPos[0 + i].type === boxPos[8 - i].type) {
        result = true;
      }
    }
  }

  if (result) {
    createModal(true);
  }
}

function tie() {
  createModal(false);
}

function createModal(result) {

  //if result is true then it's win
  const container = document.querySelector(".container");
  const titleWin = "Felicidades por ganar!!!";
  const titleTie = "Fue un gran empate";
  const modal = `
  <div class="modal">
  <div><span class="modal__text">${result ? titleWin : titleTie}</span></div>
  <div><button onclick="restart()" class="modal__button">Reiniciar</button></div>
  </div>
  `;

  container.innerHTML += modal;
}
