import {Component, inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, mergeMap, Observable} from 'rxjs';
import { Season } from '../../interfaces/season';
import {AsyncPipe} from '@angular/common';
import {MovieService} from '../movie.service';

@Component({
  selector: 'app-seasons',
  imports: [
    AsyncPipe
  ],
  templateUrl: './seasons.component.html',
  styleUrl: './seasons.component.css'
})
export class SeasonsComponent implements OnInit {
  service=inject(MovieService);
  seasons$?:Observable<Season[]>;
  @Input()id!:string;
  @Input()totalSeasons!:number;

  ngOnInit(): void {
    this.seasons$=this.service.getSeasonsByImdbId(this.id, +this.totalSeasons);
  }
}
