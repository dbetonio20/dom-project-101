import { HttpClient } from '@angular/common/http';
import { Component, OnInit, effect } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamModule } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { OpenAiImageService } from 'src/app/services/open-ai.service';



@Component({
  selector: 'action-to-speech',
  templateUrl: './action-to-speech.component.html',
  styleUrls: ['./action-to-speech.component.css'],
  imports: [WebcamModule ],
  standalone: true
})
export class ActionToSpeechComponent implements OnInit {

  constructor(private http: HttpClient,
    public openAiService: OpenAiImageService) {
      effect(() => {
       if( this.openAiService.message() != ''){
        const utterThis = new SpeechSynthesisUtterance(this.openAiService.message());

        const synth = speechSynthesis;
        synth.speak(utterThis)
       }
      })

   }

  ngOnInit() {
  }

  triggerObservable: Subject<void> = new Subject<void>();

  public handleImage(webcamImage: WebcamImage): void {
    // Process the captured image
    console.log('Image captured: ', webcamImage.imageAsDataUrl);
    const textsdas = this.openAiService.sendMessage(webcamImage.imageAsDataUrl);
    console.log(textsdas,'helloo');
    // const utterThis = new SpeechSynthesisUtterance(textToPlay);
  }



  public captureImage(): void {
    // Trigger the image capture
    this.triggerObservable.next();
    // this.openAiService.sendMessage('txt');
  }


}
