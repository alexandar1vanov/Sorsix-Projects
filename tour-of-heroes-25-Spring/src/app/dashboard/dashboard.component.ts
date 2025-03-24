import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {HEROES} from '../mock-heroes';
import {HeroesService} from '../heroes.service';
import {Hero} from '../hero';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

    heroes:Hero[]=HEROES;

    service=inject(HeroesService);

    ngOnInit(): void {
        this.heroes=this.service.getTopHeroes();
    }

}
