import {Routes} from '@angular/router';
import {MovieDetailComponent} from './movie-detail/movie-detail.component';
import {SearchComponent} from './search/search.component';

export const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'movie-detail/:imdbID', component: MovieDetailComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: '**', redirectTo: '/search'},
];

