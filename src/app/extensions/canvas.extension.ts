import { Vector } from '../models/vector';

export function line(ctx: CanvasRenderingContext2D, start: Vector, end: Vector): void {
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

export function circle(ctx: CanvasRenderingContext2D, position: Vector, radius: number, color: string = 'gray') {
  ctx.beginPath();
  ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
}


