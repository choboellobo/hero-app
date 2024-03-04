import { Routes } from '@angular/router';
import { HeroesComponent } from './views/heroes/heroes.component';

export const routes: Routes = [
    {
        path: 'heroes',
        component: HeroesComponent
    },
    {
        path: 'hero/:id',
        loadComponent: () => import('./views/heroe/heroe.component').then( m => m.HeroeComponent )
    },
    {
        path: 'hero',
        loadComponent: () => import('./views/heroe/heroe.component').then( m => m.HeroeComponent )
    },
    { path: '', redirectTo:'/heroes', pathMatch:'full' },
];
