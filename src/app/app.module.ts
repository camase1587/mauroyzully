import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginaNoDisponibleComponent } from './pagina-no-disponible/pagina-no-disponible.component';

@NgModule({
  declarations: [
    AppComponent,
    TarjetaComponent,
    PaginaNoDisponibleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
