import { circle, label, line, rectange } from '../extensions/canvas.extension';
import { ButtonNode } from './button.node';
import { Node, NodeRequest } from './node.interface';
import { Vector } from './vector';

export class ChanceNode implements Node {
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
    line(ctx, this.position, this.leftNodeButton.position);

    // LEFT NODE OR BUTTON
    if (this.left != null) {
      this.left?.draw(ctx);
    } else {
      this.leftNodeButton.draw(ctx, this.position);
    }

    // LINE TO RIGHT NODE
    line(ctx, this.position, this.rightNodeButton.position);

    // RIGHT NODE OR BUTTON
    if (this.right != null) {
      this.right?.draw(ctx);
    } else {
      this.rightNodeButton.draw(ctx, this.position);
    }

    // LABELS
    // console.log(this.leftNodeButton.position.clone().sub(this.position));
    label(ctx, this.leftBranch, this.leftNodeButton.position.clone().add(this.position).mult(0.5));
    label(ctx, this.rightBranch, this.rightNodeButton.position.clone().add(this.position).mult(0.5));

    // NODE ITSELF
    // rectange(ctx, this.title, this.position);
    circle(ctx, this.position, this.radius);

    // title
    label(ctx, this.title, this.position, 10);
  }

}
