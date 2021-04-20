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

export function label(ctx: CanvasRenderingContext2D, text: string, position: Vector) {
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.font = '20pt Helvetica';
  ctx.fillText(text, position.x, position.y);
}

export function lineLabel(ctx: CanvasRenderingContext2D, text: string, p1: Vector, p2: Vector){
  const labelPosition = p1.clone().sub(p2);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.translate(labelPosition.x, labelPosition.y);
  ctx.rotate(Math.atan2(labelPosition.x, labelPosition.y));
  ctx.fillText(text, 100, 100);
  ctx.restore();
}


