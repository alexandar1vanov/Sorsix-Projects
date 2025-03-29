import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, mergeMap, Observable} from 'rxjs';
import {Season} from '../season';
import {AsyncPipe} from '@angular/common';
import {MovieService} from '../movie.service';

@Component({
  selector: 'app-seasons',
  imports: [
    AsyncPipe
  ],
  templateUrl: './seasons.component.html',
  styleUrl: './seasons.component.css'
})
export class SeasonsComponent implements OnInit {
  service=inject(MovieService);
  seasons$?:Observable<Season[]>;
  route=inject(ActivatedRoute);

  ngOnInit(): void {
    this.seasons$ = this.route.paramMap.pipe(
      map(params => params.get('imdbID')),
      mergeMap(imdbID => {
        if (!imdbID) return [];
        return this.service.getShowByImdbId(imdbID).pipe(
          mergeMap(movie => {
            if (movie?.Type === 'series' && movie.totalSeasons) {
              return this.service.getSeasonsByImdbId(imdbID, +movie.totalSeasons);
            }
            return [];
          })
        );
      })
    );
  }
}
