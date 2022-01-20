export class Particle {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public directionX: number;
  public directionY: number;
  public size: number;
  public color: string;
  public ctx: CanvasRenderingContext2D;

  constructor(
    x: number,
    y: number,
    width:number,
    height: number,
    directionX: number,
    directionY: number,
    size: number,
    screencanvas?: CanvasRenderingContext2D
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height= height;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.ctx = screencanvas;
  }

  public draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    this.ctx.fillStyle = "#fff";
    this.ctx.fill();
  }

  public update(mouse: any) {

    if (this.x > this.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > this.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

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
  }
}
