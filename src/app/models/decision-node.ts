import { getDistance } from '../extensions/canvas-calculations';
import { AnyNode, Node, NodeRequest } from './node.interface';

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
    let leftBranchDistance = getDistance(this.x + 200, event.clientX, this.y - 200, event.clientY);
    if (leftBranchDistance <= this.radius) {
      this.leftNodeActive = true;
      return;
    } else {
      this.leftNodeActive = false;
    }

    let rightBranchDistance = getDistance(this.x + 200, event.clientX, this.y + 200, event.clientY);
    if (rightBranchDistance <= this.radius) {
      this.rightNodeActive = true;
      return;
    } else {
      this.rightNodeActive = false;
    }
    this.left?.update(event);
    this.right?.update(event);
  }

  onMouseClick(event: MouseEvent, nodeRequest: NodeRequest): void {
    if(getDistance(this.x + 200, event.clientX, this.y - 200, event.clientY) <= this.radius) {
      nodeRequest(this.x + 200, this.y - 200, this.level + 1).then((node) => {
        this.left = node
      });
      return;
    }

    if(getDistance(this.x + 200, event.clientX, this.y + 200, event.clientY) <= this.radius) {
      nodeRequest(this.x + 200, this.y + 200, this.level + 1).then((node) => {
        this.left = node
      });
    }
  }

  draw(ctx: any): void {

    if (this.leftNodeActive) {
      //
    }

    ctx.arc(this.x + this.radius, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 0x123123;
    ctx.fill();
    ctx.stroke();
  }

}
