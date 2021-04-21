import { circle, label } from '../extensions/canvas.extension';

import { Node} from './node.interface';
import { Vector } from './vector';

export class EndNode implements Node {
  radius = 50;

  constructor(
    public position: Vector,
    public title: string
  ) { }

  update(mousePosition: Vector): void { }

  handleMouseClick(mousePosition: Vector): void { }

  draw(ctx: CanvasRenderingContext2D): void {
    const height = 150;
    const width = 200;
    ctx.beginPath();
    ctx.moveTo(this.position.x , this.position.y);
    ctx.lineTo(this.position.x + width / 2, this.position.y + height);
    ctx.lineTo(this.position.x - width / 2, this.position.y + height);
    ctx.fillStyle = 'teal';
    ctx.fill();
    label(ctx, this.title, this.position.clone().add(new Vector(0, height / 2 + 20)), 10);
  }

}
