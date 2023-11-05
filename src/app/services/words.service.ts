import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  private apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en';

  constructor(private http: HttpClient) {

  }

  // public getWordData(word: string){
  //   return this.http.get(`${this.apiUrl}/${word}`)
  // }



  public getWordData(words: string[]): Observable<any[]> {
    const requests: Observable<any>[] = [];

    for (const word of words) {
      const request = this.http.get(`${this.apiUrl}/${word}`);
      requests.push(request);
    }
    console.log('observable');
    return forkJoin(requests);
  }



  // public getWordData(word: string){
  //   // return this.http.get(`${this.apiUrl}/${word}`)
  //   return this.http.get<any[]>(`${this.apiUrl}/${word}`).pipe(
  //     map((response: any) => {
  //       // Transform the response into an array
  //       return Array.isArray(response) ? response : [response];
  //     })
  //   );
  // }
}
