import { Component, HostBinding, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Quote } from '../quote';
import { QuoteServiceService } from '../quote-service.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-quotes',
  imports: [AsyncPipe],
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  service = inject(QuoteServiceService);
  randomQuote: Observable<Quote> = this.service.getRandomQuote();

  @HostBinding('style.--quote-color') backgroundColor: string | undefined;

  ngOnInit(): void {
    // Initialize with a random color
    this.backgroundColor = this.service.getRandomColor();
  }

  getNewQuote(): void {
    this.randomQuote = this.service.getRandomQuote().pipe(
      tap(() => {
        this.backgroundColor = this.service.getRandomColor(); // Update the CSS variable dynamically
      })
    );
  }

  protected readonly encodeURIComponent = encodeURIComponent;
}
