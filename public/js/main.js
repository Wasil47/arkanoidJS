const arkaBoard = document.getElementById('arka-board');
const player = document.getElementById('player');
const arkanoid = document.getElementById('arkanoid');
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
  const playerWidth = player.offsetWidth;
  const boardWidth = arkaBoard.offsetWidth;
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