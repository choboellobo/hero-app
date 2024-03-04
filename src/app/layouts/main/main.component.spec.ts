import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { MaterialModule } from '../../shared/material/material.module';
import { Component } from '@angular/core';

@Component({
  template: `<app-main-layout [toolbarTitle]="title"></app-main-layout>`
})
class TestHostComponent {
    toolbarTitle = 'Test Title';
}

describe('MainComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let mainComponent: MainComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [MaterialModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    mainComponent = fixture.debugElement.children[0].componentInstance; // Obtener la instancia de MainComponent desde el componente principal
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(mainComponent).toBeTruthy();
  });

  it('should display the toolbar title', () => {
    expect(mainComponent.toolbarTitle).toEqual(testHost.toolbarTitle);
  });
});
