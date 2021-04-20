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
    public branchLength: number,
    public title: string,
    public leftBranch: string,
    public rightBranch: string,
    public requestNode: NodeRequest
  ) {

    const newBranchLendth = (branchLength) / 2;
    const newLeftNodePosition = this.position
    .clone()
    .add(new Vector(-branchLength, this.radius * 3)); // shifting to left side

    this.leftNodeButton = new ButtonNode(newLeftNodePosition, (newNodePosition: Vector) => {
      requestNode(newNodePosition, newBranchLendth).then((node) => {
        this.left = node;
      });
    });

    const newRightNodePosition = this.position
    .clone()
    .add(new Vector(branchLength, this.radius * 3));

    this.rightNodeButton = new ButtonNode(newRightNodePosition, (newNodePosition: Vector) => {
      requestNode(newNodePosition, newBranchLendth).then((node) => {
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
    // LINE TO LEFT NODE
    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y);
    ctx.lineTo(this.leftNodeButton.position.x, this.leftNodeButton.position.y);
    ctx.stroke();

    // LEFT NODE OR BUTTON

    if (this.left != null) {
      this.left?.draw(ctx);
    } else {
      this.leftNodeButton.draw(ctx, this.position);
    }

    // LINE TO RIGHT NODE
    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y);
    ctx.lineTo(this.rightNodeButton.position.x, this.rightNodeButton.position.y);
    ctx.stroke();

    // RIGHT NODE OR BUTTON

    if (this.right != null) {
      this.right?.draw(ctx);
    } else {
      this.rightNodeButton.draw(ctx, this.position);
    }

    // NODE ITSELF
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'gray';
    ctx.fill();
    ctx.stroke();
  }

}
