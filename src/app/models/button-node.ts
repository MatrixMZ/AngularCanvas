import { getDistance } from '../extensions/canvas-calculations';
import { Vector } from './vector';

export class ButtonNode {
  isActive = false;
  radius = 30;

  constructor(
    public position: Vector,
    public onClick: (position: Vector) => void // should open dialog from parent class
  ) { }

  /**
   * Sets the hover status when mouse position is above button
   *
   * @param event MouseEvent
   */
  update(mousePosition: Vector): void {
    this.isActive = this.position.distance(mousePosition) <= this.radius;
  }

  /**
   * Executes provided onClick function when the button is clicked.
   *
   * @param event MouseEvent
   */
  handleMouseClick(mousePosition: Vector): void {
    if (this.position.distance(mousePosition) <= this.radius) {
      this.onClick(this.position);
    }
  }

  draw(ctx: CanvasRenderingContext2D, parentPosition: Vector): void {
    // TODO: Draw Line from parent to button

    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.isActive ? 'teal' : '#EEEEEE';
    ctx.fill();
    ctx.stroke();
  }

}
