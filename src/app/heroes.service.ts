import {inject, Injectable} from '@angular/core';
import {HEROES} from './mock-heroes';
import {Hero} from './hero';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HeroesService {
    http=inject(HttpClient);
    state: State = {
        selectedHero: undefined,
        count: 0,
        favoriteHeroes:[],
    }

    count=0;

    getHeroById(id:number):Hero | undefined{
        return this.getHeroes().find(it=>it.id===id);
    }

    getTopHeroes(n=4):Hero[]{
        return this.getHeroes().slice(0,n);
    }

    getHeroesAsync():Observable<Hero[]> {
        return this.http.get<Hero[]>('/api/heroes');
    }

    getHeroByIdAsync(id:number):Observable<Hero> {
        return this.http.get(`/api/heroes/${id}`);
    }

    getHeroes(): Hero[] {
        return HEROES
    }
}

export interface State {
    selectedHero: Hero | undefined;
    count: number;
    favoriteHeroes: Hero[];
}


