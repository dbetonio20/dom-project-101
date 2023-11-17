import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OpenAI } from "openai";
import { from, tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAiImageService {
  public message = signal('');

  openai?: OpenAI;
  constructor(private http: HttpClient) {
    this.openai = new OpenAI({
      apiKey: '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',
      dangerouslyAllowBrowser: true,
    });
  }

  async sendMessage(image: string) {
    const completionObservable = from(
      this.openai!.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "What’s in this image?" },
              {
                type: "image_url",
                image_url: {
                  "url": image,
                },
              },
            ],
          },
        ],
      })
    );

    completionObservable.pipe(
      tap(response => {
        console.log(response);
        const sample: string = response.choices[0]?.message.content?.toString() ?? "";
        this.message.set(sample);
      }),
      catchError(error => {
        console.error("Error in API request:", error);
        // Handle the error or rethrow if needed
        return [];
      })
    ).subscribe();
  }
}
