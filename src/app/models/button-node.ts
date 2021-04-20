import { getDistance } from '../extensions/canvas-calculations';

export class ButtonNode {
  isActive = false;
  radius = 30;

  constructor(
    public x: number,
    public y: number,
    public onClick: (x: number, y: number) => void // should open dialog from parent class
  ) { }

  /**
   * Sets the hover status when mouse position is above button
   *
   * @param event MouseEvent
   */
  update(event: MouseEvent): void {
    this.isActive = getDistance(this.x, event.clientX, this.y , event.clientY) <= this.radius;
  }

  /**
   * Executes provided onClick function when the button is clicked.
   *
   * @param event MouseEvent
   */
  handleMouseClick(event: MouseEvent): void {
    if (getDistance(this.x, event.clientX, this.y , event.clientY) <= this.radius) {
      this.onClick(this.x, this.y);
    }
  }

  draw(ctx: CanvasRenderingContext2D, parentX: number, parentY: number): void {
    // TODO: Draw Line from parent to button

    ctx.beginPath();
    ctx.arc(this.x + this.radius, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.isActive ? 'teal' : '#EEEEEE';
    ctx.fill();
    ctx.stroke();
  }

}
