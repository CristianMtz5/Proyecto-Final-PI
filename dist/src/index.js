import { Particle } from "./particle.js";
var canvas;
var ctx;
canvas = document.getElementById("canvas1");
ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var particlesArray;
var mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80),
};
function handleMouse(e) {
    mouse.x = e.x;
    mouse.y = e.y;
}
function init() {
    particlesArray = new Array(0);
    var numberofParticles = (canvas.height * canvas.width) / 9000;
    var pantalla1 = ctx;
    for (var i = 0; i < numberofParticles * 2; i++) {
        var size = Math.random() * 5 + 1;
        var x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
        var y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
        var directionX = Math.random() * 5 - 2.5;
        var directionY = Math.random() * 5 - 2.5;
        particlesArray.push(new Particle(x, y, canvas.width, canvas.height, directionX, directionY, size, pantalla1));
    }
}
function connect() {
    //let opacityValue = 1;
    for (var i = 0; i < particlesArray.length; i++) {
        for (var j = i; j < particlesArray.length; j++) {
            var distance = (particlesArray[i].x - particlesArray[j].x) *
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
    for (var i = 0; i < particlesArray.length; i++) {
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
