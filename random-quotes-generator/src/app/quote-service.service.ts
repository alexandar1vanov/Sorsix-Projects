import {HostBinding, inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Quote} from './quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteServiceService {
  http=inject(HttpClient);
  colors: string[] = ["#553333", "#336699", "#669933", "#993366", "#663399", "#996633"];
  @HostBinding('style.--quote-color') backgroundColor: string | undefined;


  getQuotesAsync(): Observable<Quote[]> {
    return this.http.get<{quotes: Quote[]}>('https://gist.githubusercontent.com/camperbot/' +
      '5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/' +
      'quotes.json').pipe(
      map(response => response.quotes)
    );
  }

  getRandomQuote():Observable<Quote>{
    return this.getQuotesAsync().pipe(
      map(quotes=>{
        const randomIndex=Math.floor(Math.random()*quotes.length);
        return quotes[randomIndex];
      })
    )
  }

  getRandomColor():string{
    const randomIndex=Math.floor(Math.random()*this.colors.length)
    return this.colors[randomIndex];
  }
}
