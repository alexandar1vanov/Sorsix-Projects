import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Hero } from "../hero"
import { HEROES } from "../mock-heroes";
@Component({
    templateUrl: './heroes.component.html',
    selector: 'app-heroes',
    styleUrl: './heroes.component.css',
    // imports: [JsonPipe, UpperCasePipe, NgFor]
})
export class HeroesComponent {
    heroes: Hero[] = HEROES;
    @Output() selectedHero = new EventEmitter<Hero>();
    @Input() selected: Hero | undefined;

    onHero(hero: Hero) {
        console.log('hero clicked', hero);
        this.selectedHero.emit(hero);
    }
    
}
