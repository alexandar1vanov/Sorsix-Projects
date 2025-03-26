import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { SearchComponent } from "./search/search.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchComponent, RouterLinkActive, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'movie-search';
}
