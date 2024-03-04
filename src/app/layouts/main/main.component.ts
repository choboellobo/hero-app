import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  @Input() toolbarTitle: string = '';
}
