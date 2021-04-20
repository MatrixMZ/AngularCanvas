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
    const newLeftNodePosition = this.position
      .clone()
      .add(new Vector(200, -200)) // moves to position
      .mult(new Vector(1, 1.2)); // x,y scale

    this.leftNodeButton = new ButtonNode(newLeftNodePosition, (newNodePosition: Vector) => {
      requestNode(newNodePosition, level + 1).then((node) => {
        this.left = node;
      });
    });

    const newRightNodePosition = this.position
      .clone()
      .add(new Vector(200, +200)) // moves to position
      .mult(new Vector(1, 0.9)); // x,y scale
    this.rightNodeButton = new ButtonNode(new Vector(position.x + 200, position.y + 200), (newNodePosition: Vector) => {
      requestNode(newNodePosition, level + 1).then((node) => {
        this.right = node;
      });
    });
  }

  update(mousePosition: Vector): void {
    if (this.left != null) {
      this.left?.update(mousePosition);
    } else {
      this.leftNodeButton.update(mousePosition);
    }

    if (this.right != null) {
      this.right?.update(mousePosition);
    } else {
      this.rightNodeButton?.update(mousePosition);
    }
  }

  handleMouseClick(mousePosition: Vector): void {
    this.left?.handleMouseClick(mousePosition);
    this.right?.handleMouseClick(mousePosition);

    if (this.left === undefined) {
      this.leftNodeButton.handleMouseClick(mousePosition);
    }

    if (this.right === undefined) {
      this.rightNodeButton.handleMouseClick(mousePosition);
    }
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
