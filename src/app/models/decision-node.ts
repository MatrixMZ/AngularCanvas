import { ButtonNode } from './button-node';
import { Node, NodeRequest } from './node.interface';
import { Vector } from './vector';

export class DecisionNode implements Node {
  radius = 50;
  leftNodeButton: ButtonNode;
  rightNodeButton: ButtonNode;
  left?: Node;
  right?: Node;

  constructor(
    public position: Vector,
    public level: number,
    public title: string,
    public leftBranch: string,
    public rightBranch: string,
    public requestNode: NodeRequest
  ) {
    // const direction = new Vector(200, -200);
    // const scale = new Vector(1, 0.9);
    // const newLeftNodePosition = this.position.add(direction).mult(scale);

    this.leftNodeButton = new ButtonNode(new Vector(position.x + 200, position.y - 200), (newNodePosition: Vector) => {
      requestNode(newNodePosition, level + 1).then((node) => {
        this.left = node;
      });
    });

    // const rightDirection = new Vector(1, 0.9);
    // const newRightNodePosition = this.position.mult(rightDirection);
    this.rightNodeButton = new ButtonNode(new Vector(position.x + 200, position.y + 200), (newNodePosition: Vector) => {
      requestNode(newNodePosition, level + 1).then((node) => {
        this.right = node;
      });
    });
  }

  update(mousePosition: Vector): void {
    // Update buttons
    this.leftNodeButton.update(mousePosition);
    this.rightNodeButton.update(mousePosition);

    // Update children
    this.left?.update(mousePosition);
    this.right?.update(mousePosition);
  }

  handleMouseClick(mousePosition: Vector): void {
    this.leftNodeButton.handleMouseClick(mousePosition);
    this.rightNodeButton.handleMouseClick(mousePosition);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'gray';
    ctx.fill();
    ctx.stroke();

    if (this.left != null) {
      this.left?.draw(ctx);
    } else {
      this.leftNodeButton.draw(ctx, this.position);
    }

    if (this.right != null) {
      this.right?.draw(ctx);
    } else {
      this.rightNodeButton.draw(ctx, this.position);
    }
  }

}
