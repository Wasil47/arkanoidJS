const arkaBoard = document.getElementById('arka-board');
const player = document.getElementById('player');
const arkanoid = document.getElementById('arkanoid');
const canvasBall = document.getElementById('ball');
const ctx = canvasBall.getContext("2d");

const 
balls = [],
randomInit = Math.random()-Math.random(),
speed = 3,
size = 5,
amount = 1,
color = 'hsl(200, 40%, 50%)';

const playerWidth = player.offsetWidth;
const playerHeight = player.offsetHeight;
const playerHeight2 = player.offsetHeight*2;
const w = canvasBall.width = arkaBoard.offsetWidth;
const h = canvasBall.height = arkaBoard.offsetHeight;
ctx.fillStyle = color;

let x = 0;

// const boxes = [
//   ['#arka-map', 60] // 5x12
// ];

// for (const [map, items] of boxes) {
//   const container = document.querySelector(map);

//   for (let i=0; i<items; i++){
//     const newBlock = document.createElement('div');
//     newBlock.className = 'block';
//     newBlock.id = i;
//     container.appendChild(newBlock);
//   }
// };

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
      newBlock.style.left = j * playerWidth + 'px';
      newBlock.style.top = i * playerHeight + 'px';
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
    // player.style.transform = `translateX(${x}px)`;
  } else if (x >= (w - playerWidth)) {
    x = w - playerWidth
    // player.style.transform = `translateX(${x}px)`;
  } 
  // else {
  //   player.style.transform = `translateX(${x}px)`;
  // }
  player.style.transform = `translateX(${x}px)`;
  document.getElementById('test').innerHTML = "x = "+x;
  player.innerHTML = "x = "+x; 
  
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
    // if ( this.xpos > x && this.xpos < (x + playerWidth) ) {
    //   if ( 
    //   (this.ypos + this.size) >= (h - playerHeight2) 
    //   // || (this.ypos + this.size) == (h - playerHeight/2) 
    //   ) {
    //     this.dy = -this.dy;
    //     console.log('hit playerY'); 
    //   }
    // }

    if ( 
      this.xpos > x && 
      this.xpos < (x + playerWidth) &&
      this.ypos + this.size > (h - playerHeight2) &&
      this.ypos + this.size < (h + playerHeight)      
      ) {
        this.dy = -this.dy;
        console.log('hit playerY'); 


        // if ( 
        // (this.ypos + this.size) >= (h - playerHeight2) || 
        // (this.ypos + this.size) <= (h + playerHeight)  
        // ) {

        // }
        // if ( 
        // (this.xpos + this.size) >= x &&
        // (this.xpos + this.size) <= (x + playerWidth)
        // ) {
        //   this.dx = -this.dx;
        //   console.log('hit playerX'); 
        // }
      }


  
    // hit blocks

    for (let i=0; i<blocks.length; i++) {
      const blockX = blocks[i].offsetLeft;
      const blockY = blocks[i].offsetTop;
      const blockW = blocks[i].offsetWidth;
      const blockH = blocks[i].offsetHeight;
      if ( 
        (this.ypos - this.size) <= blockY + blockH &&
        this.xpos > blockX && this.xpos < (blockX + blockW)
        ) {
        this.dy = -this.dy;
        console.log('hit blockY');       
        
        // blocks[i].classList.remove('block');
        // blocks[i].classList.add('hidden');
        blocks[i].remove();
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



