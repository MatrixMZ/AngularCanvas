import { AfterViewInit, Component, ElementRef, HostListener, NgZone, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNodeDialogComponent } from 'src/app/components/add-node-dialog/add-node-dialog.component';
import { DecisionNode } from 'src/app/models/decision-node';
import { AnyNode, Node } from 'src/app/models/node.interface';
import { map } from 'rxjs/operators';
import { Vector } from 'src/app/models/vector';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;
  canvasSize: Vector;

  node?: Node = null;

  @HostListener('window:resize', ['event'])
  onResize() {
    this.canvasSize = new Vector(window.innerWidth, window.innerHeight);

    this.canvas.nativeElement.setAttribute('width', String(this.canvasSize.x));
    this.canvas.nativeElement.setAttribute('height', String(this.canvasSize.y));
  }

  constructor(
    private ngZone: NgZone,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    this.onResize();

    this.ctx = this.canvas.nativeElement.getContext('2d');

    // NgZone used for better performance.
    this.ngZone.runOutsideAngular(() => this.animate());
    this.canvas.nativeElement.addEventListener('click', (event) => {
      this.onMouseClick(new Vector(event.clientX, event.clientY));
    });
    this.canvas.nativeElement.addEventListener('mousemove', (event) => {
      this.update(new Vector(event.clientX, event.clientY));
    });

    this.requestNode(new Vector(this.canvasSize.x / 2, this.canvasSize.y / 7), this.canvasSize.x / 4).then((node) => {
      this.node = node;
      console.log(node);
    });

  }

  /**
   * Goes thorugh entire node tree and updates each node value when mouse position is changed.
   *
   * @param event MouseEvent
   */
  private update(mousePosition: Vector) {
    this.node?.update(mousePosition);
  }

  private onMouseClick(mousePosition: Vector) {
    this.node?.handleMouseClick(mousePosition);
  }

  /**
   * Recurrency function draws graph on each loop.
   */
  private animate() {
    this.ctx.clearRect(0, 0, this.canvasSize.x, this.canvasSize.y);
    this.node?.draw(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  }

  /**
   * Opens dialog form to create new node
   *
   * @returns AnyNode
   */
  requestNode(position: Vector, level: number): Promise<AnyNode> {
    const dialogRef = this.dialog.open(AddNodeDialogComponent);

    // TODO: Convert form data to new Node
    return dialogRef.afterClosed().pipe(map((form) => {
      return new DecisionNode(position, level, '123', '112', '12', this.requestNode.bind(this));
    })).toPromise<AnyNode>();
  }

}

