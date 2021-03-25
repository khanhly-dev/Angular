import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class HeroService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {

  }

  //get heroes with static data
  // getHeroes(): Observable<Hero[]> {
  //   const heroes = of(HEROES);
  //   this.messageService.add('HeroService: fetched heroes');
  //   return heroes;
  // }
  private heroesUrl = 'api/heroes2'; //api url

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  };


  //get all --> load list date
  //get data by httpClient from API url
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl) //get data from port
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }


  //get by id -->> seach data
  getHero(id: number): Observable<Hero> {
    // const hero = HEROES.find(h => h.id === id) as Hero;
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    // return of(hero);
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  //add record (POST)
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added hero w id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      )
  }


  //delete record (DELETE)
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(this.heroesUrl, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id =${id}`)),
        catchError(this.handleError<any>('deleteHero'))
      )
  }

  //seach
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>
      (`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ?
          this.log(`found heroes matching"${term}"`) :
          this.log(`no heroes matching "${term}"`),
          catchError(this.handleError<any>('seachHeroes', []))
        )

      )
  }

  private log(message: String) {
    this.messageService.add(`heroService : ${message}`)
  }


}
