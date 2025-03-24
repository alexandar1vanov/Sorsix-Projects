import {Component, Inject, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HEROES} from '../mock-heroes';
import {ActivatedRoute, ParamMap, RouterLink} from '@angular/router';
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

        this.hero$ = this.route.ParamMap.pipe(
            map((paramMap:ParamMap)=>paramMap.get('id')),
                map((id)=>+id!),
                filter((id)=>!Number.isNaN(id)),
                mergeMap((id)=>this.service.getHeroByIdAsync(id)),
                catchError(err=>of(null))
        );

    }
}



