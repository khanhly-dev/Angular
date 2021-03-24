import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  
  heroes: Hero[] = [];

  // selectedHero?: Hero;
  constructor(private heroService: HeroService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.getHeroes();
  }

  //async
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  //sync
  // getHeroes() : void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  //event handle
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }
}
