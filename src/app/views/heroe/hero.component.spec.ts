import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroeComponent } from './heroe.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastrService } from 'ngx-toastr';



describe('HeroesComponent', () => {
  let component: HeroeComponent;
  let fixture: ComponentFixture<HeroeComponent>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let snackBarMock: any;
  let toastMock: any;
  beforeEach(async () => {
    toastMock = {
      success: jest.fn(),
      error: jest.fn()
    };

    mockActivatedRoute = {
      snapshot: {
        paramMap: convertToParamMap({ id: '1' })
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        FormBuilder,
        { provide: ToastrService, useValue: toastMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

      }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.hero_id = null;
  });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set hero_id and call getHeroAndFillForm() if route param exists', () => {
      const spy = jest.spyOn(component, 'getHeroAndFillForm')
      component.ngOnInit();
      expect(component.hero_id).toEqual('1');
      expect(spy).toHaveBeenCalled();
    });
    
    it("should create a new hero", () => {
      const heroesService = fixture.debugElement.injector.get(HeroesService);
      const spy = jest.spyOn( heroesService, 'create' );
      component.form.setValue({name: 'test', alias: 'test', age: 18, description: 'test'});
      component.handlerForm();
      expect(component.form.valid).toBeTruthy();
      expect(spy).toHaveBeenCalled();
      expect(toastMock.success).toHaveBeenCalled();
    });

    it("should update a hero", () => {
      const heroesService = fixture.debugElement.injector.get(HeroesService);
      const spy = jest.spyOn( heroesService, 'update' );
      component.hero_id = '1';
      component.form.setValue({name: 'test', alias: 'test', age: 18, description: 'test'});
      component.handlerForm();
      expect(component.form.valid).toBeTruthy();
      expect(spy).toHaveBeenCalled();
      expect(toastMock.success).toHaveBeenCalled();
    });



});
