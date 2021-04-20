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
    circle(ctx, this.position, this.radius);
    label(ctx, this.title, this.position, 10);
  }

}
