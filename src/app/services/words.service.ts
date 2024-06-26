import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { GameParentComponent } from '../components/games/game-parent/game-parent.component';

@Injectable({
    providedIn: 'root'
})
export class WordsService extends GameParentComponent {
    private apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en';
    public wordsArray = [
        "amazing", "cave", "sneeze", "rhetorical", "bedroom", "handle", "fool",
        "previous", "five", "cloudy", "sincere", "scratch", "decorous", "multiply",
        "shrill", "lettuce", "two", "jelly", "bird", "arrive", "came", "weigh",
        "doubtful", "unknown", "abounding", "wakeful", "nine", "change", "recess",
        "excellent", "signal", "actually", "blind", "admit", "zipper", "pizzas",
        "curly", "deeply", "coast", "hissing", "frogs", "limping", "station", "wrong",
        "jumbled", "powder", "pat", "craven", "library", "puffy"
    ];
    public hasWordData = signal(false);
    public signalWordData = signal({});
    public signalWord = signal({});


    constructor(private http: HttpClient) {
        super()

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

    public getRandomWordData() {
        const randomWords = this.getRandomElements(this.wordsArray);
        const requests: Observable<any>[] = [];

        for (const word of randomWords) {
            const request = this.http.get(`${this.apiUrl}/${word}`);
            requests.push(request);
        }
        console.log('observable');
        return forkJoin(requests);
    }

    public getRandomElements(array: any) {
        const shuffled = array.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 5);
    }

    public setGameWordsData(wordData: any){
        this.wordsData = wordData.wordData;
        this.words = wordData.words;
        this.hasWordData.set(true)
        // this.signalWordData.set(this.wordsData);
        // this.signalWord.set(this.words);
    }

    public getGameWordsData(){
         const GameWordsData = [{wordData: this.wordsData, words: this.words}]
        //  const [{ wordData, words }] = [{ wordData: this.wordsData, words: this.words }];
        return GameWordsData;
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
