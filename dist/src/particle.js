var Particle = /** @class */ (function () {
    function Particle(x, y, width, height, directionX, directionY, size, screencanvas) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.ctx = screencanvas;
    }
    Particle.prototype.draw = function () {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        this.ctx.fillStyle = "#fff";
        this.ctx.fill();
    };
    Particle.prototype.update = function (mouse) {
        if (this.x > this.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > this.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        var dx = mouse.x - this.x;
        var dy = mouse.y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < this.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < this.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
        //move particle
        this.x += this.directionX;
        this.y += this.directionY;
        //draw particle
        this.draw();
    };
    return Particle;
}());
export { Particle };
