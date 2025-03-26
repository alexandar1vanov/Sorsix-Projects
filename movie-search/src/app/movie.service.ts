// movie.service.ts
import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable, map, forkJoin, switchMap, of, catchError, throwError, tap} from 'rxjs';
import {Movie} from './movie';
import {Season} from './season';

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
      switchMap(response => {
        if (response.Search) {
          return forkJoin(
            response.Search.map(movie =>
              this.http.get<Movie>(`${this.baseUrl}?i=${movie.imdbID}&apikey=${this.apiKey}&plot=full`)
            )
          );
        }
        return of([]);
      })
    );
  }


  // getSeasons(imdbID: string, totalSeasons: number): Observable<Season[]> {
  //   const seasonRequests = Array.from({length: totalSeasons}, (_, index) => {
  //     const season = index + 1;
  //     const url = `${this.baseUrl}?i=${imdbID}&Season=${season}&apikey=${this.apiKey}`;
  //     console.log('povik');
  //     return this.http.get<{ Episodes: Season[] }>(url).pipe(
  //       map(response => response.Episodes?.map(episode => ({...episode, season})) || [])
  //     );
  //   });
  //   return forkJoin(seasonRequests).pipe(
  //     map(allSeasons => allSeasons.flat())
  //   );
  // }

  getShowByImdbId(imdbId: string | undefined): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}?apiKey=${this.apiKey}&i=${imdbId}&plot=full`).pipe(
      tap(movie => console.log('Movie Data:', movie)),
      switchMap((show: Movie) =>
        show.Type === 'series' && show.totalSeasons
          ? this.getSeasonsByImdbId(show.imdbID!, +show.totalSeasons).pipe(
            map((seasons: Season[]) => ({...show, Seasons: seasons}))
          ) : of(show)),
      catchError(this.handleError<Movie>('getShowByImdbId'))
    );
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
