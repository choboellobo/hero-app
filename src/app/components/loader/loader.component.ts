import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

}
