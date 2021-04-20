import { ButtonNode } from './button-node';
import { Node, NodeRequest } from './node.interface';

export class DecisionNode implements Node {
  radius = 50;
  leftNodeButton: ButtonNode;
  rightNodeButton: ButtonNode;
  left?: Node;
  right?: Node;

  constructor(
    public x: number,
    public y: number,
    public level: number,
    public title: string,
    public leftBranch: string,
    public rightBranch: string,
    public requestNode: NodeRequest
  ) {
    this.leftNodeButton = new ButtonNode(x + 200, y - 200, (positionX, positionY) => {
      requestNode(positionX, positionY, level + 1).then((node) => {
        this.left = node;
      });
    });

    this.rightNodeButton = new ButtonNode(x + 200, y + 200, (positionX, positionY) => {
      requestNode(positionX, positionY, level + 1).then((node) => {
        this.right = node;
      });
    });
  }

  update(event: MouseEvent): void {
    // Update buttons
    this.leftNodeButton.update(event);
    this.rightNodeButton.update(event);

    // Update children
    this.left?.update(event);
    this.right?.update(event);
  }

  handleMouseClick(event: MouseEvent): void {
    this.leftNodeButton.handleMouseClick(event);
    this.rightNodeButton.handleMouseClick(event);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x + this.radius, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'gray';
    ctx.fill();
    ctx.stroke();

    if (this.left != null) {
      this.left?.draw(ctx);
    } else {
      this.leftNodeButton.draw(ctx, this.x, this.y);
    }

    if (this.right != null) {
      this.right?.draw(ctx);
    } else {
      this.rightNodeButton.draw(ctx, this.x, this.y);
    }
  }

}
