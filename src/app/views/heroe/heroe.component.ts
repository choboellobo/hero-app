import { Component, NgZone, OnInit, inject } from '@angular/core';
import { MainComponent } from '../../layouts/main/main.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material/material.module';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-heroe',
  standalone: true,
  imports: [
    MaterialModule,
    MainComponent,
    LoaderComponent,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './heroe.component.html',
  styleUrl: './heroe.component.scss'
})
export class HeroeComponent implements OnInit {
  private toast = inject(ToastrService);
  private zone = inject(NgZone)
  private router = inject(Router);
  private heroService = inject(HeroesService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  loading: boolean = false;
  hero_id?: string | null;
  form: FormGroup =  this.fb.group({
      name: new FormControl('', [ Validators.required]),
      alias: new FormControl('', [ Validators.required]),
      age: new FormControl('', [ Validators.required, Validators.min(18)]),
      description: new FormControl('', [ Validators.required])
  })

  constructor() {}

  ngOnInit() {
    ;
    this.hero_id = this.route.snapshot.paramMap.get('id') ?? null;
    if( this.hero_id ) {
      this.getHeroAndFillForm();
    }
  }

  handlerForm() {
    if (this.form.invalid) {
      return;
    }
    if( this.hero_id ) {
      this.heroService.update( {id: Number(this.hero_id), ...this.form.value } );
      this.toast.success('Hero updated', '', { timeOut: 3000 });
    }else {
      this.heroService.create( {id: Date.now(), ...this.form.value} );
      this.toast.success('Hero created', '', { timeOut: 3000 });
    }
    this.zone.run(() => this.router.navigate(['/heroes']))
  }

  getHeroAndFillForm() {
    this.loading = true;
    this.heroService.get( Number(this.hero_id) )
      .subscribe({
            next: (hero: Hero ) => {
              if( hero) 
                this.form.patchValue(hero);
                this.loading = false;
            },
            error: ( error ) => {
             this.toast.error('Error', 'Error loading hero', { timeOut: 3000 });
              //this.router.navigate(['/heroes']);
              this.loading = false;
            }
      })
  }

}
