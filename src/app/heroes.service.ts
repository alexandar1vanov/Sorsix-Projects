import { inject, Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class HeroesService {
    http = inject(HttpClient);
    state: State = {
        selectedHero: undefined,
        count: 0,
    };
    // selectedHero: Hero | undefined;
    count = 0;

    constructor() {
        console.log('heroes service constructor');
    }

    getHeroes(): Hero[] {
        return HEROES;
    }

    getHeroesAsync(): Observable<Hero[]> {
        // return of(HEROES).pipe(
        //     delay(3000),
        // );
        return this.http.get<Hero[]>('/api/heroes');
    }

    getHeroById(id: number): Hero | undefined {
        return this.getHeroes().find((it) => it.id === id);
    }

    getHeroByIdAsync(id: number): Observable<Hero> {
        return this.http.get<Hero>(`/api/heroes/${id}`);
    }

    getTopHeroes(n = 4): Hero[] {
        return this.getHeroes().slice(0, n);
    }

    // getHeroesFromApi(callback: (data: any) => void) {
    //     const httpAsync = new XMLHttpRequest();
    //     httpAsync.open('GET', 'http://localhost:3000/heroes', true);
    //     httpAsync.onload = function (data) {
    //         if (httpAsync.status >= 200 && httpAsync.status < 300) {
    //             // Request was successful
    //             const response = JSON.parse(httpAsync.responseText);
    //             console.log('Data received:', response);
    //             callback(response);
    //         } else {
    //             // Request failed
    //             console.error('Request failed with status:', httpAsync.status);
    //         }
    //     };
    //     httpAsync.send();
    // }
}
export interface State {
    selectedHero: Hero | undefined;
    count: number;
}
