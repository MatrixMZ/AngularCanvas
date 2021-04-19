import { AnyNode, Node } from './node.interface';


export type NodeRequest = (x: number, y: number, level: number) => AnyNode;

export class DecisionNode implements Node {
  radius = 50;
  leftNodeActive = false;
  rightNodeActive = false;
  left?: Node;
  right?: Node;


  constructor(
    public x: number,
    public y: number,
    public level: number,
    public title: string,
    public leftBranch: string,
    public rightBranch: string
  ) { }

  update(event: MouseEvent): void {
    throw new Error('Method not implemented.');
  }

  onMouseClick(event: MouseEvent, nodeRequest: NodeRequest): void {
    throw new Error('Method not implemented.');
  }

  draw(ctx: any): void {
    ctx.arc(this.x + this.radius, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 0x123123;
    ctx.fill();
    ctx.stroke();
  }

}
