let canvas = document.getElementById("myCanvas");
let brush = canvas.getContext("2d");

let turn = false;
let boxPos;

let playerX;
let playerO;

let xPoints = 0;
let oPoints = 0;

// Event that catches the click to select the box

function startMenu() {
  playerX = document.querySelector("#p1").value;
  playerO = document.querySelector("#p2").value;

  createHeader(playerX, playerO);
  restart();
}

function start() {
  boxPos = [
    { id: 1, sx: 0, sy: 0, ex: 166, ey: 166, active: false, type: 2 },
    { id: 2, sx: 166, sy: 0, ex: 332, ey: 166, active: false, type: 2 },
    { id: 3, sx: 332, sy: 0, ex: 500, ey: 166, active: false, type: 2 },
    { id: 4, sx: 0, sy: 166, ex: 166, ey: 332, active: false, type: 2 },
    { id: 5, sx: 166, sy: 166, ex: 332, ey: 332, active: false, type: 2 },
    { id: 6, sx: 332, sy: 166, ex: 500, ey: 332, active: false, type: 2 },
    { id: 7, sx: 0, sy: 332, ex: 166, ey: 500, active: false, type: 2 },
    { id: 8, sx: 166, sy: 332, ex: 332, ey: 500, active: false, type: 2 },
    { id: 9, sx: 332, sy: 332, ex: 500, ey: 500, active: false, type: 2 },
  ];
  turn = false;

  const pointStart = 166;
  brush.beginPath();
  brush.lineWidth = 7;
  brush.lineCap = "round";
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

  pointTurn();
}

function restart() {
  const modal = document.querySelector(".modal");
  canvas = document.getElementById("myCanvas");
  brush = canvas.getContext("2d");

  canvas.addEventListener("click", (ev) => {
    const mousePos = getMousePos(ev);
    boxActive(mousePos);
  });

  brush.clearRect(0, 0, canvas.width, canvas.height);
  modal.remove();
  start();
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

function createHeader(p1, p2) {
  const header = document.querySelector(".header");
  const playerStatus = `
  <div class="header_item" id="p2">
  <strong class="header_item-icon">⭕</strong><span>${p2}</span>
  </div>
  <div class="header_item" id="p1">
  <strong class="header_item-icon">✖️</strong><span>${p1}</span>
  </div>`;
  header.innerHTML += playerStatus;
}

function createModal(result, winner) {
  //if result is true then it's win
  const container = document.querySelector(".container");
  const pl1 = document.querySelector("#p1");
  const pl2 = document.querySelector("#p2");
  const titleWin = `Congratulations ${winner}, it was a great victory`;
  const titleTie = "It was a great tied";
  const modal = `
  <div class="modal">
  <div><p class="modal__text">${result ? titleWin : titleTie}</p></div>
  <div><button onclick="restart()" class="modal__button">Restart</button></div>
  </div>
  `;

  if (result) {
    turn
      ? (pl1.innerHTML = `<strong class="header_item-icon">✖️</strong><span>${playerX}</span><div class="header_item-point">${xPoints}</div>`)
      : (pl2.innerHTML = `<strong class="header_item-icon">⭕</strong><span>${playerO}</span><div class="header_item-point">${oPoints}</div>`);
  }

  container.innerHTML += modal;
}

function pointTurn() {
  const canvasBg = document.getElementById("canvasBg");
  const brushBg = canvasBg.getContext("2d");

  const lineLength = 220;
  const x = 250;
  const y = 250;

  brushBg.clearRect(0, 0, canvasBg.width, canvas.height);

  brushBg.lineWidth = 20;
  brushBg.strokeStyle = "#00000066";
  brushBg.lineCap = "round";
  brushBg.beginPath();

  if (turn) {
    brushBg.moveTo(x - lineLength, y - lineLength);
    brushBg.lineTo(x + lineLength, y + lineLength);
    brushBg.moveTo(x - lineLength, y + lineLength);
    brushBg.lineTo(x + lineLength, y - lineLength);
  } else {
    brushBg.arc(x, y, lineLength, 0, Math.PI * 2, true);
  }
  brushBg.stroke();
}

function getMousePos(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
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
    turn
      ? createX(invokePos.x, invokePos.y)
      : createCircle(invokePos.x, invokePos.y);

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

  pointTurn();
}

function win(turn) {
  // true == x false = circle
  const player = turn ? playerX : playerO;
  let result = false;

  for (let i = 0; i < boxPos.length; i += 3) {
    if (boxPos[i].active && boxPos[i + 1].active && boxPos[i + 2].active) {
      if (
        boxPos[i].type === boxPos[i + 1].type &&
        boxPos[i].type === boxPos[i + 2].type
      ) {
        result = true;
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    if (boxPos[i].active && boxPos[i + 3].active && boxPos[i + 6].active) {
      if (
        boxPos[i].type === boxPos[i + 3].type &&
        boxPos[i].type === boxPos[i + 6].type
      ) {
        result = true;
      }
    }
  }

  for (let i = 0; i < 3; i += 2) {
    if (boxPos[0 + i].active && boxPos[4].active && boxPos[8 - i].active) {
      if (
        boxPos[0 + i].type === boxPos[4].type &&
        boxPos[0 + i].type === boxPos[8 - i].type
      ) {
        result = true;
      }
    }
  }

  if (result) {
    turn ? xPoints++ : oPoints++;
    createModal(true, player);
  }
}

function tie() {
  createModal(false, "");
}
