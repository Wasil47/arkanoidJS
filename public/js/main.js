const arkaBoard = document.getElementById('arka-board');
const player = document.getElementById('player');
const arkanoid = document.getElementById('arkanoid');
const canvasBall = document.getElementById('ball');
const ctx = canvasBall.getContext("2d");
const blockWH = document.getElementById('wh');

const 
balls = [],
randomInit = Math.random()-Math.random(),
speed = 5,
size = 5,
amount = 1,
color = 'hsl(200, 40%, 50%)';

const blockWidth = blockWH.offsetWidth;
const blockHeight = blockWH.offsetHeight;
const playerWidth = player.offsetWidth;
const playerHeight = player.offsetHeight;
const playerHeight2 = player.offsetHeight*2;
const w = canvasBall.width = arkaBoard.offsetWidth;
const h = canvasBall.height = arkaBoard.offsetHeight;
ctx.fillStyle = color;

let x = 0;

const boxes = [
  ['#arka-map', 12, 5] // 12 x 5
];

for (const [map, columns, rows] of boxes) {
  const container = document.querySelector(map);

  for (let i=0; i<rows; i++){
    for (let j=0; j<columns; j++) {
      const newBlock = document.createElement('div');
      newBlock.className = 'block';
      // newBlock.style.transform = `translate(${j*playerWidth}px, ${i*playerHeight}px)`;
      newBlock.style.left = j * blockWidth + 'px';
      newBlock.style.top = i * blockHeight + 'px';
      container.appendChild(newBlock);
    }
  }
};

const blocks = document.querySelectorAll('.block');

const movePlayer = ()=>{

  let xMouse = event.clientX;
  x = xMouse - arkanoid.offsetLeft - playerWidth/2;
  
  if (x <= 0) {
    x = 0
  } else if (x >= (w - playerWidth)) {
    x = w - playerWidth
  }
  player.style.transform = `translateX(${x}px)`;
  document.getElementById('test').innerHTML = "x = "+x;
  // player.innerHTML = "x = "+x;   
};


class Ball {
  constructor (xpos, ypos, size, ballSpeed) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.size = size;
    this.ballSpeed = ballSpeed;

    this.dx = this.ballSpeed*randomInit //direction x
    this.dy = this.ballSpeed; //direction y
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
      console.log('hit right'); 
           
    }
    if ( (this.xpos - this.size) < 0 ) {
      this.dx = -this.dx;
      console.log('hit left');
    }
    if ( (this.ypos + this.size) > h ) {
      this.dy = -this.dy;
      console.log('hit bot');
    }
    if ( (this.ypos - this.size) < 0 ) {
      this.dy = -this.dy;
      console.log('hit top');      
    }

    // hit player    
    if ( // hits Y axis
    this.xpos > x && 
    this.xpos < (x + playerWidth) 
    ) {
      if (
      this.ypos == (h - playerHeight2)
      ) {
        this.dy = -this.dy;
        console.log('hit player top');
      }
      if (
      this.ypos >= (h - playerHeight) &&
      this.ypos - this.size <= (h - playerHeight)
      ) {
        this.dy = -this.dy;
        console.log('hit player bot');
      }
    }
    
    if ( // hit X axis
    this.ypos > (h - playerHeight2) &&
    this.ypos < (h - playerHeight)
    ) {
      if (
      this.xpos + this.size >= x &&
      this.xpos <= x
      ) {
        this.xpos = x - this.size*2;
        this.dx = -this.dx;
        this.dy = -this.dy;
        console.log('hit player left');
      }
      if (
      this.xpos - this.size <= (x + playerWidth) &&
      this.xpos >= (x + playerWidth)
      ) {
        this.xpos = (x + playerWidth) + this.size*2;
        this.dx = -this.dx;
        this.dy = -this.dy;
        console.log('hit player right');
      }
      if (
      this.xpos - this.size > x &&
      this.xpos < (x + playerWidth/2)
      ) {
        this.ypos = (h - playerHeight2) - this.size
        this.xpos = x - this.size*3;
        console.log('ball inside left');
      }
      if (
      this.xpos + this.size < (x + playerWidth) &&
      this.xpos > (x + playerWidth/2)
      ) {
        this.ypos = (h - playerHeight2) - this.size
        this.xpos = (x + playerWidth) + this.size*3;        
        console.log('ball inside right');
      }
    }
  
    // hit blocks
    for (let i=0; i<blocks.length; i++) {
      const blockX = blocks[i].offsetLeft;
      const blockY = blocks[i].offsetTop;
      const blockW = blocks[i].offsetWidth;
      const blockH = blocks[i].offsetHeight;
      if ( 
      this.xpos >= blockX && 
      this.xpos <= (blockX + blockW) 
      ) {
        if (          
        (this.ypos + this.size) >= blockY &&
        (this.ypos - this.size) <= (blockY + blockH)
        ) {
          this.dy = -this.dy;
          console.log('hit block Y');
          blocks[i].remove();          
        }        
      }
      if ( 
      this.ypos >= blockY &&
      this.ypos <= (blockY + blockH)
      ) {
        if (
          (this.xpos + this.size) >= blockX && 
          (this.xpos - this.size) <= (blockX + blockW) 
        ) {
          this.dx = -this.dx;
          console.log('hit block X');
          blocks[i].remove(); 
        }  
      }
    }

    // move ball
    this.xpos += this.dx;
    this.ypos += this.dy;
  }
};

const createBalls = ()=>{
  for (let i = 0; i < amount; i++) {
    const posX = w/2;
    const posY = h/2;
    const mySpeed = speed;
  
    const newBall = new Ball (posX, posY, size, mySpeed);
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

document.addEventListener('mousemove', movePlayer);