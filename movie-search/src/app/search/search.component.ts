import {Component, inject, OnInit} from '@angular/core';
import {Subject, debounceTime, distinctUntilChanged, switchMap, Observable, of, tap, forkJoin, mergeMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MovieService} from '../movie.service';
import { Movie } from './../../interfaces/movie';
import {FormControl} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  input = new FormControl();
  service = inject(MovieService);
  movies$?: Observable<Movie[]>;
  private subject = new Subject<string>();

  ngOnInit(): void {
    this.movies$ = this.subject.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      mergeMap((query) => this.service.search(query)),
    );
  }

  onChange(value: string) {
    this.subject.next(value);
  }

}

