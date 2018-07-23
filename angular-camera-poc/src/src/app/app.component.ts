import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

  @ViewChild('video')
  public video: ElementRef;

  @ViewChild('canvas')
  public canvas: ElementRef;

  public capturas: Array<any>;

  public temCamera = true;
  public mensagem = '';

  public constructor() {
    this.capturas = [];
  }

  public ngOnInit() {}

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 640, height: 480 } })
      .then(stream => {
        this.video.nativeElement.src = window.URL.createObjectURL(stream);
        this.video.nativeElement.play();
      }).catch((err) => {
        this.mensagem = 'Erro ao exibir video 640 x 480 px - ' + err.name + ' - ' + err.message;
        console.log('Erro ao exibir video 640 x 480 px -', err.name + ' - ' + err.message);
        this.temCamera = false;
      });
    }
  }

  public captura() {
    const context = this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.capturas.push(this.canvas.nativeElement.toDataURL('image/png'));
    console.log('this.capturas');
    console.log(this.capturas);
  }

}
