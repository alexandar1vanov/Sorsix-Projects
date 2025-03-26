import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {map, Observable, switchMap, tap} from 'rxjs';
import {Movie} from '../movie';
import {MovieService} from '../movie.service';
import {AsyncPipe} from '@angular/common';
import {Season} from '../season';

@Component({
  selector: 'app-movie-detail',
  imports: [
    AsyncPipe,
  ],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {
  movie$?:Observable<Movie | null>
  route=inject(ActivatedRoute);
  service=inject(MovieService);
  seasons$?:Observable<Season[]>;

  ngOnInit(): void {
    this.movie$ = this.route.paramMap.pipe(
      map(params => params.get('imdbID')),
      switchMap(imdbID => imdbID ? this.service.getShowByImdbId(imdbID) : []),
      tap(movie => {
        if (movie && movie.Type === 'series' && movie.totalSeasons) {
          this.seasons$ = this.service.getSeasonsByImdbId(movie.imdbID!, +movie.totalSeasons);
        }
        // this.movie$=this.service.getShowByImdbId(movie.imdbID!);
      })
    );
  }

}
