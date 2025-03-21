import { Routes } from '@angular/router';
import {HeroesComponent} from './heroes/heroes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
export const routes: Routes = [
    { path: 'heroes', component: HeroesComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'hero-detail/:id', component: HeroDetailComponent },
    // { path: '', redirectTo: '/heroes', pathMatch: 'full' },
    // { path: '**', redirectTo: '/heroes'},
];

