import { Component } from "@angular/core";
import { HeroesComponent } from "./heroes/heroes.component";
import { Hero } from "./hero";
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";
import { FavHeroesComponent } from "./fav-heroes/fav-heroes.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [HeroesComponent, HeroDetailComponent, FavHeroesComponent]
})
export class AppComponent {
    selectedHero: Hero | undefined;
    selected: Hero | undefined;
    onSelected(hero:Hero){
        this.selectedHero=hero;
    }

}
