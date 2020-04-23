import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { WINDOW } from '../../core/services/window.service';

@Component({
  selector: 'dry-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BoardComponent implements OnInit, AfterViewInit {
  private prevX = 0;
  private prevY = 0;
  private currX = 0;
  private currY = 0;
  private fillColor = 'black';
  private mouseIsDown = false;

  @HostBinding('class.dry-board') hostClass = true;
  context: CanvasRenderingContext2D;

  tool: 'pencil' | 'eraser' = 'pencil';

  @ViewChild('canvas', { static: true }) canvasRef: ElementRef;

  constructor(@Inject(WINDOW) private window: Window) {
    window.addEventListener('resize', this.resizeCanvas);
  }

  ngOnInit(): void {
    this.context = this.canvasRef.nativeElement.getContext('2d');

    this.context.canvas.addEventListener(
      'mousemove',
      (e) => {
        this.findCoord('move', e);
      },
      false
    );
    this.context.canvas.addEventListener(
      'mousedown',
      (e) => {
        this.findCoord('down', e);
      },
      false
    );
    this.context.canvas.addEventListener(
      'mouseup',
      (e) => {
        this.findCoord('up', e);
      },
      false
    );
    this.context.canvas.addEventListener(
      'mouseout',
      (e) => {
        this.findCoord('out', e);
      },
      false
    );
  }

  ngAfterViewInit(): void {
    window.dispatchEvent(new Event('resize'));
  }

  private findCoord(res, e: MouseEvent) {
    switch (res) {
      case 'down':
        console.log(
          'down',
          this.context.canvas.offsetTop,
          this.context.canvas.offsetParent.clientTop,
          this.context.canvas.clientTop
        );
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = e.clientX - this.context.canvas.offsetLeft;
        this.currY = e.clientY - this.getCanvasTop(this.context.canvas); // this.context.canvas.offsetTop;

        this.mouseIsDown = true;
        this.context.beginPath();
        this.context.fillStyle = this.fillColor;
        this.context.fillRect(this.currX, this.currY, 2, 2);
        this.context.closePath();
        break;
      case 'up':
      case 'out':
        this.mouseIsDown = false;
        break;
      case 'move':
        if (this.mouseIsDown) {
          this.prevX = this.currX;
          this.prevY = this.currY;
          this.currX = e.clientX - this.context.canvas.offsetLeft;
          this.currY = e.clientY - this.getCanvasTop(this.context.canvas); // this.context.canvas.offsetTop;
          this.draw();
        }
        break;
    }
  }

  private draw() {
    this.context.beginPath();
    this.context.moveTo(this.prevX, this.prevY);
    this.context.lineTo(this.currX, this.currY);
    this.context.strokeStyle = this.fillColor;
    this.context.lineWidth = 2;
    this.context.stroke();
    this.context.closePath();
  }

  onClearClick() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
  }

  onToolChange($event: MatButtonToggleChange) {
    this.tool = $event.value;
  }

  private resizeCanvas() {
    console.log('pre-resize', this.canvasRef);
    const canvasEl = document.querySelector(
      '#dry-canvas-board'
    ) as HTMLCanvasElement;
    // const canvasEl = this.canvasRef.nativeElement as HTMLElement;
    const parent = canvasEl.parentElement;
    console.log('resize', parent.offsetHeight);
    const context = canvasEl.getContext('2d');
    context.canvas.width = parent.offsetWidth;
    context.canvas.height = parent.offsetHeight;
  }

  private getCanvasTop(theElement) {
    let posY = 0;

    while (theElement != null) {
      posY += theElement.offsetTop;
      theElement = theElement.offsetParent;
    }

    return posY;
  }
}
