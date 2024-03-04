import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroesComponent } from './heroes.component';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

const listHeroes: Hero[] = [
    { id: 1, name: 'Spiderman', alias: 'Peter Parker', age: 25, description: 'The best hero' }
];

describe('TestComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let matDialogMock: any;

  beforeEach(async () => {
    matDialogMock = {
        open: jest.fn().mockReturnValue({
          afterClosed: () => of( true ) // Simula clic en "Aceptar"
        })
      };
  
    await TestBed.configureTestingModule({
      imports: [HeroesComponent, BrowserAnimationsModule],
      providers: [
        { provide: MatDialog, useValue: matDialogMock },
        { provide: ActivatedRoute, useValue: { snapshot: { data: {} } } } 

      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call getData ngOnInit', () => {   
    const spy = jest.spyOn(component, 'getData');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('delete Hero call dialog', () => {
    const heroesService = fixture.debugElement.injector.get(HeroesService);
    const spy  = jest.spyOn( heroesService, 'delete');
    const heroToDelete: Hero = listHeroes[0];
    component.heroes = [heroToDelete];
    component.deleteHero(heroToDelete);
    expect(matDialogMock.open).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(heroToDelete.id);
    expect(component.heroes).not.toContain(heroToDelete);
  });


  it('getHeroes should return a list of heroes', () => {
    const heroesService = fixture.debugElement.injector.get(HeroesService); 
    const spy  = jest.spyOn( heroesService, 'list').mockReturnValueOnce( of(listHeroes) );
  
    component.getData();
    expect(spy).toHaveBeenCalled();
    expect(component.heroes).toEqual(listHeroes);
})
 

});
