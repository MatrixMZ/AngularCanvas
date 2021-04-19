import { AfterViewInit, Component, ElementRef, HostListener, NgZone, ViewChild } from '@angular/core';
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
    this.canvasHeight = window.innerHeight - 64;
    this.canvas.nativeElement.setAttribute('width', String(this.canvasWidth));
    this.canvas.nativeElement.setAttribute('height', String(this.canvasHeight));
  }

  constructor(private ngZone: NgZone) { }

  ngAfterViewInit(): void {
    this.onResize();
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ngZone.runOutsideAngular(() => this.animate());
    this.canvas.nativeElement.addEventListener('click', this.update);
    this.canvas.nativeElement.addEventListener('mousemove', this.onMouseClick);
  }

  update(event: MouseEvent) {
    this.node?.update(event);
  }

  onMouseClick(event: MouseEvent) {
    this.node?.onMouseClick(event, this.requestNode);
  }

  animate() {
    // Do stuff
    requestAnimationFrame(this.animate.bind(this));
  }

  /**
   * Opens dialog form to create new node
   * @returns Node
   */
  requestNode(x: number, y: number, level: number): AnyNode {
    return new DecisionNode(10, 10, 1, '123', '112', '12');
  }

}

