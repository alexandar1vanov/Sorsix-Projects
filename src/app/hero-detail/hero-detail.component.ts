import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
@Component({
    selector: 'hero-detail',
    imports: [],
    templateUrl: './hero-detail.component.html',
    styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent {
    heroes: Hero[] = HEROES;
    @Input() hero: Hero | undefined;

    addCompare(hero:Hero){
        hero.isFavorite=!hero.isFavorite;
    }
}
