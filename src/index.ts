import { Particle } from "./particle.js";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

canvas = <HTMLCanvasElement>document.getElementById("canvas1");
ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray: Particle[];

let mouse: any = {
  x: null,
  y: null,
  radius: (canvas.height / 80) * (canvas.width / 80),
};

function handleMouse(e: any) {
  mouse.x = e.x;
  mouse.y = e.y;
}

function init() {
  particlesArray = new Array(0);
  let numberofParticles = (canvas.height * canvas.width) / 9000;
  let pantalla1 = ctx;
  for (let i = 0; i < numberofParticles * 2; i++) {
    let size = Math.random() * 5 + 1;
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
    let directionX = Math.random() * 5 - 2.5;
    let directionY = Math.random() * 5 - 2.5;
    
    particlesArray.push(
      new Particle(x, y, canvas.width, canvas.height, directionX, directionY, size, pantalla1)
    );
  }
}

function connect() {
  //let opacityValue = 1;
  for (let i = 0; i < particlesArray.length; i++) {
    for (let j = i; j < particlesArray.length; j++) {
      let distance =
        (particlesArray[i].x - particlesArray[j].x) *
          (particlesArray[i].x - particlesArray[j].x) +
        (particlesArray[i].y - particlesArray[j].y) *
          (particlesArray[i].y - particlesArray[j].y);
      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        //opacityValue = 1 - distance / 20000;
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update(mouse);
  }
  requestAnimationFrame(animate);
  connect();
}

function outMouse() {
  mouse.x = undefined;
  mouse.y = undefined;
}

function resizeWindow() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  mouse.radius = (canvas.height / 80) * (canvas.width / 80);
  init();
}

init();
animate();
canvas.addEventListener("mousemove", handleMouse);
canvas.addEventListener("mouseout", outMouse);
window.addEventListener("resize", resizeWindow);
