import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {map, mergeMap, Observable, switchMap, tap} from 'rxjs';
import {Movie} from '../movie';
import {MovieService} from '../movie.service';
import {AsyncPipe} from '@angular/common';
import {Season} from '../season';
import {SeasonsComponent} from '../seasons/seasons.component';

@Component({
  selector: 'app-movie-detail',
  imports: [
    AsyncPipe,
    SeasonsComponent,
  ],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {
  movie$?: Observable<Movie | null>
  route = inject(ActivatedRoute);
  service = inject(MovieService);
  seasons$?: Observable<Season[]>;

  ngOnInit(): void {
    this.movie$ = this.route.paramMap.pipe(
      map(params => params.get('imdbID')),
      mergeMap(imdbID => imdbID ? this.service.getShowByImdbId(imdbID) : []),
    );
  }
}
