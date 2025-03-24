import {Component, inject,OnInit} from "@angular/core";
import { Hero } from "../hero"
import { HEROES } from "../mock-heroes";
import {HeroesService} from '../heroes.service';
import {RouterLink} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {async, Observable, of} from 'rxjs';
@Component({
    templateUrl: './heroes.component.html',
    selector: 'app-heroes',
    styleUrl: './heroes.component.css',
    imports: [RouterLink,AsyncPipe],
})
export class HeroesComponent implements OnInit {

    service= inject(HeroesService);
    heroes$: Observable<Hero[]>=this.service.getHeroesAsync();

    constructor() {
        console.log('service',this.service);
    }

    ngOnInit():void{
        // this.heroes=this.service.getHeroes();
    }

}
