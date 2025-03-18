import { Hero } from './../hero';
import { Component, EventEmitter,Input,Output } from '@angular/core';
import { HEROES } from '../mock-heroes';
@Component({
  selector: 'fav-heroes',
  imports: [],
  templateUrl: './fav-heroes.component.html',
  styleUrl: './fav-heroes.component.css'
})
export class FavHeroesComponent {
    heroes: Hero[] = HEROES;
    @Output() selectedHero = new EventEmitter<Hero>();
    @Input() selected: Hero | undefined;

    showInfo(hero:Hero){
        console.log('fav-hero selected: ',hero);
        this.selectedHero.emit(hero);
    }

}
