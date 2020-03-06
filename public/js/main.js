const arkaBoard = document.getElementById('arka-board');
const player = document.getElementById('player');
const arkanoid = document.getElementById('arkanoid');
const canvasBall = document.getElementById('ball');
const ctx = canvasBall.getContext("2d");

const 
balls = [],
speed = 5,
size = 3,
amount = 1,
color = 'hsl(200, 40%, 50%)';

const playerWidth = player.offsetWidth;
const w = boardWidth = arkaBoard.offsetWidth;
const h = boardWidth = arkaBoard.offsetHeight;

console.log(w, h);



const boxes = [
  ['#arka-map', 60] // 5x12
];

for (const [map, items] of boxes) {
  const container = document.querySelector(map);

  for (let i=0; i<items; i++){
    const newBlock = document.createElement('div');
    newBlock.className = 'block';
    newBlock.id = i;
    container.appendChild(newBlock);
  }
};

const movePlayer = ()=>{

  let xMouse = event.clientX;
  let x = xMouse - arkanoid.offsetLeft - playerWidth/2;
  
  if (x <= 0) {
    player.style.transform = `translateX(${0}px)`;
  } else if (x >= (boardWidth - playerWidth)) {
    player.style.transform = `translateX(${boardWidth - playerWidth}px)`;
  } else {
    player.style.transform = `translateX(${x}px)`;
  }
  document.getElementById('test').innerHTML = "x = "+x;
  player.innerHTML = "x = "+x;  
};

document.addEventListener('mousemove', movePlayer);


class Ball {
  constructor (xpos, ypos, size, speed) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.size = size;
    this.speed = speed;

    this.dx = this.speed; //direction x
    this.dy = this.speed; //direction y     
    
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.xpos, this.ypos, this.size, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
  }
  move() { //update position (draw new one)
    this.draw();

    // hit walls
    if ( (this.xpos + this.size) > w ) {
      this.dx = -this.dx;
    }
    if ( (this.xpos - this.size) < 0 ) {
      this.dx = -this.dx;
    }
    if ( (this.ypos + this.size) > h ) {
      this.dy = -this.dy;
    }
    if ( (this.ypos - this.size) < 0 ) {
      this.dy = -this.dy;
    }

    this.xpos += this.dx;
    this.ypos += this.dy;
  }
};

const createBalls = ()=>{
  for (let i = 0; i < amount; i++) {
    const posX = w/2;
    const posY = h/2;

    console.log(posX);
    console.log(posY);
    
  
    const newBall = new Ball (posX, posY, size, speed);
    balls.push(newBall);
  }
  moveBalls();  
};

const moveBalls = () => {  
  ctx.clearRect(0, 0, w, h);
  balls.forEach((e)=>{
    e.move();
  });
  requestAnimationFrame(moveBalls);
};

createBalls();

console.log(balls);
