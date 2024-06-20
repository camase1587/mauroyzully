import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { PaginaNoDisponibleComponent } from './pagina-no-disponible/pagina-no-disponible.component';

const routes: Routes = [
  { path: ':idTarjeta', component: TarjetaComponent },
  { path: '', component: TarjetaComponent },
  { path: 'tarjeta/nodisponible', component: PaginaNoDisponibleComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
