import { Vector } from '../models/vector';

export function line(ctx: CanvasRenderingContext2D, start: Vector, end: Vector): void {
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

export function circle(ctx: CanvasRenderingContext2D, position: Vector, radius: number, color: string = 'gray'): void {
  ctx.beginPath();
  ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
}

export function label(ctx: CanvasRenderingContext2D, text: string, position: Vector, fontSize: number = 20): void {
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.font = `${fontSize}pt Helvetica`;
  ctx.fillText(text, position.x, position.y);
}

// export function lineLabel(ctx: CanvasRenderingContext2D, text: string, p1: Vector, p2: Vector): void {
//   const labelPosition = p1.clone().sub(p2);

//   ctx.save();
//   ctx.textAlign = 'center';
//   ctx.translate(labelPosition.x, labelPosition.y);
//   ctx.rotate(Math.atan2(labelPosition.x, labelPosition.y));
//   ctx.fillText(text, 100, 100);
//   ctx.restore();
// }

export function rectange(ctx: CanvasRenderingContext2D, label: string, position: Vector): void {
  const width = 150;
  const height = 75;
  // const fontSize = label.length * 

  ctx.lineWidth = 4;
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#abc";

  ctx.beginPath();
  ctx.fillStyle = 'teal';
  ctx.fillRect(position.x - width / 2 , position.y - height / 2, width, height);
  ctx.stroke();


  ctx.font="13px Georgia";
  ctx.textAlign="center"; 
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(label, position.x , position.y);
}



