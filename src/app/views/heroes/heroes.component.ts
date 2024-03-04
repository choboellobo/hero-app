import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { MainComponent } from '../../layouts/main/main.component';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { LoaderComponent } from '../../components/loader/loader.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { ModalConfirmComponent } from '../../components/modal-confirm/modal-confirm.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    MainComponent,
    LoaderComponent,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent {
  private dialog = inject( MatDialog )
  private heroesService = inject(HeroesService);
  loading = false;
  heroes: Hero[] = [];

  displayedColumns: string[] = ['Name', 'Alias', 'Age', 'Description', 'Actions'];
  searchingControl: FormControl = new FormControl('');
  filterHeroes: string = '';

  constructor(){}
  
  ngOnInit() {
    this.getData();
    this.searchingControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe( filter => {
      this.filterHeroes = filter;
      this.getData()
    })
  }


  deleteHero( hero: Hero ) {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: { title: 'Delete a Hero', message: `Do you want delete a ${hero.alias}?`}
    });
    dialogRef.afterClosed().subscribe( result => {
      if( result ) {
        this.heroesService.delete( Number(hero.id) );
        this.heroes = this.heroes.filter( _hero => _hero.id != hero.id )
      }
    })
  }

  getData( ) {
    this.loading = true;
    this.heroesService.list( this.filterHeroes ).subscribe(heroes => {
      this.heroes = heroes;
      this.loading = false;
    });
  }


}
