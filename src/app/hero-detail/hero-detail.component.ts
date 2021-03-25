import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',  //component dc goi qua selector nay duoi dang the html nhu sau <app-hero-detail></app-hero-detail>
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  // @Input() tesst:number;
  // @Output() eventOut = new EventEmitter<string>();
  // lazy load module
  // Rxjs

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

    //@Input() herocc ?: Hero; @Input() de them thuoc tinh herocc cho the <app-hero-detail></app-hero-detail>

  ngOnInit(): void {
    this.getHero();
  }

  //get id from rout of heroes component to display in hero-detail component by id of hero
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save():void{
    this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    
  }
}
