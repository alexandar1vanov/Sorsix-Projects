import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {QuotesComponent} from './quotes/quotes.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, QuotesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'random-quotes-generator';
}
