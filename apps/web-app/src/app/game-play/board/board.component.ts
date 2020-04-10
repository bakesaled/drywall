import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'dry-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  private context: CanvasRenderingContext2D;
  private prevX = 0;
  private prevY = 0;
  private currX = 0;
  private currY = 0;
  private fillColor = 'black';
  private mouseIsDown = false;

  @ViewChild('canvas', { static: true }) canvasRef: ElementRef;

  constructor() {}

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

  private findCoord(res, e: MouseEvent) {
    switch (res) {
      case 'down':
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = e.clientX - this.context.canvas.offsetLeft;
        this.currY = e.clientY - this.context.canvas.offsetTop;

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
          this.currY = e.clientY - this.context.canvas.offsetTop;
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
}
