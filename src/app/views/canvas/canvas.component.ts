import { AfterViewInit, Component, ElementRef, HostListener, NgZone, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNodeDialogComponent } from 'src/app/components/add-node-dialog/add-node-dialog.component';
import { DecisionNode } from 'src/app/models/decision-node';
import { AnyNode, Node } from 'src/app/models/node.interface';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;
  canvasWidth!: number;
  canvasHeight!: number;

  node?: Node;

  @HostListener('window:resize', ['event'])
  onResize() {
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight; // - 64
    this.canvas.nativeElement.setAttribute('width', String(this.canvasWidth));
    this.canvas.nativeElement.setAttribute('height', String(this.canvasHeight));
  }

  constructor(
    private ngZone: NgZone,
    public dialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    this.onResize();
    this.ctx = this.canvas.nativeElement.getContext('2d');

    // NgZone used for better performance.
    this.ngZone.runOutsideAngular(() => this.animate());
    this.canvas.nativeElement.addEventListener('click', this.update);
    this.canvas.nativeElement.addEventListener('mousemove', this.onMouseClick);

    this.node = this.requestNode(200, 200, 1);
  }

  /**
   * Goes thorugh entire node tree and updates each node value when mouse position is changed.
   *
   * @param event MouseEvent
   */
  update(event: MouseEvent) {
    this.node?.update(event);
  }

  onMouseClick(event: MouseEvent) {
    this.node?.onMouseClick(event, this.requestNode);
  }

  /**
   * Recurrency function draws graph on each loop.
   */
  animate() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.node?.draw(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  }

  /**
   * Opens dialog form to create new node
   *
   * @returns AnyNode
   */
  requestNode(x: number, y: number, level: number): AnyNode {
    const dialogRef = this.dialog.open(AddNodeDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log(`Dialog result: ${result}`);
    });

    return new DecisionNode(10, 10, 1, '123', '112', '12');
  }

}

