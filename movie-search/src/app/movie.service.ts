// movie.service.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, forkJoin, switchMap, of, catchError, throwError, tap, mergeMap } from 'rxjs';
import { Movie } from '../interfaces/movie';
import { Season } from '../interfaces/season';
interface ApiResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  private http = inject(HttpClient);
  private apiKey = 'c630b5cc';
  private baseUrl = 'https://www.omdbapi.com/';


  search(query: string): Observable<Movie[]> {
    const url = `${this.baseUrl}?s=${query}&apikey=${this.apiKey}`;
    return this.http.get<ApiResponse>(url).pipe(
      switchMap(response => response.Search ? this.fetchMovieDetails(response.Search) : of([]))
    );
  }

  private fetchMovieDetails(movies: Movie[]): Observable<Movie[]> {
    return forkJoin(
      movies.map(movie =>
        this.http.get<Movie>(`${this.baseUrl}?i=${movie.imdbID}&apikey=${this.apiKey}&plot=full`)
      )
    );
  }

  getShowByImdbId(imdbId: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}?apiKey=${this.apiKey}&i=${imdbId}&plot=full`);
  }

  getSeasonsByImdbId(imdbId: string, totalSeasons: number): Observable<Season[]> {
    return forkJoin(
      Array.from({ length: totalSeasons }, (_, i) =>
        this.http.get<Season>(`${this.baseUrl}?apiKey=${this.apiKey}&i=${imdbId}&Season=${i + 1}`).pipe(
          catchError(this.handleError<Season>(`getSeason ${i + 1}`))
        )
      )
    );
  }

  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }


}
