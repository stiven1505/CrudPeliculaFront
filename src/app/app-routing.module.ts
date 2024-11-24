import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicaComponent } from './components/area-publica/area-publica.component';
import { PeliculaComponent } from './components/pelicula/pelicula.component';

const routes: Routes = [
  { path: 'publica', component: PublicaComponent },
  { path: 'pelicula', component: PeliculaComponent },
  { path: '', redirectTo: '/publica', pathMatch: 'full' } // Redirecciona a /publica por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Usa forRoot para la configuración global
  exports: [RouterModule]
})
export class AppRoutingModule { }

