import { Injectable } from '@angular/core';
import { marvelHeroes } from './heroes.mock';
import { Observable, delay, map, of, throwError } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private heroes: Hero[] = marvelHeroes;
  constructor() { }

  list(filter: string ): Observable<Hero[]> {
    return of(this.heroes)
      .pipe(
        delay(1000),
        map(
          heroes => heroes.filter(hero => 
            hero.name.toLowerCase().includes(filter.toLowerCase()) ||
            hero.alias.toLowerCase().includes(filter.toLowerCase()) ||
            hero.age.toString().includes(filter.toLowerCase())
          )
        )
      );
  }

  get(id: number): Observable<Hero> {
    const hero = this.heroes.find( hero => hero.id === id )
    if( hero ) return of(hero).pipe( delay( 1000 ))
    else return throwError('Hero not found')
  }

  create( hero: Hero ): void {
    this.heroes.push( hero )
  }

  update( hero: Hero ): void {
    this.heroes = this.heroes.map( h => h.id === hero.id ? hero : h )
  }

  delete( id: number ): void {
    this.heroes = this.heroes.filter( hero => hero.id != id )
  }

  

}
