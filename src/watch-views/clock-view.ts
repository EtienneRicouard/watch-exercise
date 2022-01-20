import { Watch } from '../watch-model';
import { AbstractWatchView } from './abstract-watch-view';
import { WatchButtonController } from './watch-view';

export class ClockView extends AbstractWatchView {
  private watchElement = document.createElement('div');
  private canvas = document.createElement('canvas');
  constructor(parentElement: HTMLElement,
    lightController: WatchButtonController,
    increaseController: WatchButtonController,
    modeController: WatchButtonController,
  ) {
    super(parentElement, lightController, increaseController, modeController);
    this.init();
  }

  render(watch: Watch): void {
    const ctx = this.canvas.getContext('2d');
    if (ctx) {
      const radius = this.canvas.height / 2;
      const internalRadius = radius * 0.90;
      this.canvas.style.backgroundColor = watch.lightMode ? 'black' : 'white';
      this.drawFace(ctx, internalRadius, watch.lightMode);
      this.drawNumbers(ctx, internalRadius, watch.lightMode);
      this.drawTime(ctx, internalRadius, watch.date, watch.lightMode, watch.hourEditMode, watch.minuteEditMode);
    }
  }

  protected init(): void {
    this.watchDiv.classList.add('clock-watch');
    this.canvas.width = 400;
    this.canvas.height = 400;
    const ctx = this.canvas.getContext('2d');
    const radius = this.canvas.height / 2;
    ctx?.translate(radius, radius);
    this.watchElement.appendChild(this.canvas);
    this.watchDiv.appendChild(this.watchElement);
    this.watchDiv.appendChild(this.lightElement);
    this.watchDiv.appendChild(this.increaseElement);
    this.watchDiv.appendChild(this.modeElement);
    this.lightElement.innerHTML = 'Lights';
    this.increaseElement.innerHTML = '+';
    this.modeElement.innerHTML = 'Mode';
  }

  private drawFace(ctx: CanvasRenderingContext2D, radius: number, lightsOn: boolean): void {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fillStyle = lightsOn ? 'black' : 'white';
    ctx.fill();
    const grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, lightsOn ? '#BBB' : '#333');
    grad.addColorStop(0.5, lightsOn ? 'black' : 'white');
    grad.addColorStop(1, lightsOn ? '#BBB' : '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2*Math.PI);
    ctx.fillStyle = lightsOn ? '#BBB' : '#333';
    ctx.fill();
  }

  private drawNumbers(ctx: CanvasRenderingContext2D, radius: number, lightsOn: boolean): void{
    ctx.font = radius*0.15 + 'px arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    for(let num = 1; num < 13; num++){
      const ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillStyle = lightsOn ? 'white' : 'black';
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  }

  private drawTime(ctx: CanvasRenderingContext2D, radius: number, date: Date, lightsOn: boolean, editHours: boolean, editMinutes: boolean): void{
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    //hour
    hour = hour%12;
    hour = (hour*Math.PI/6) + (minute*Math.PI/(6*60)) + (second*Math.PI/(360*60));
    this.drawHand(ctx, hour, radius*0.5, radius*0.07, lightsOn, editHours);
    //minute
    minute=(minute*Math.PI/30) + (second*Math.PI/(30*60));
    this.drawHand(ctx, minute, radius*0.8, radius*0.07, lightsOn, editMinutes);
    // second
    second = (second*Math.PI/30);
    this.drawHand(ctx, second, radius*0.9, radius*0.02, lightsOn, false);
  }

  private drawHand(ctx: CanvasRenderingContext2D, pos: number, length: number, width: number, lightsOn: boolean, editMode: boolean): void {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.strokeStyle = editMode ? 'red' : lightsOn ? 'white' : 'black';
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }
}