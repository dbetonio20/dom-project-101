import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  private apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en';

  constructor(private http: HttpClient) {

  }

  public getWordData(word: string){
    return this.http.get(`${this.apiUrl}/${word}`)
  }
}
