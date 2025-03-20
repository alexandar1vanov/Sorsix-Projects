import {Component, Inject, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HEROES} from '../mock-heroes';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {HeroesService} from '../heroes.service';
import {catchError, filter, map, mergeMap, Observable, of} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
    selector: 'hero-detail',
    imports: [
        RouterLink,AsyncPipe
    ],
    templateUrl: './hero-detail.component.html',
    styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit {

    hero$?: Observable<Hero | null>;
    error$?: Observable<string>;
    route = Inject(ActivatedRoute);
    service = Inject(HeroesService);

    ngOnInit(): void {
        // const id = this.route.snapshot.paramMap.get('id');
        // console.log('id', id);
        // if (id) {
        //     this.hero = this.service.getHeroById(+id);
        //     console.log('hero', this.hero);
        // }

        this.hero$ = this.route.paramMap.pipe(
            map((drugacije)=>drugacije.get('id')),
                map((id)=>+id!),
                filter((id)=>!Number.isNaN(id)),
                mergeMap((id)=>this.service.getHeroByIdAsync(+id)),
                catchError(err=>of(null))
        );

    }
}



