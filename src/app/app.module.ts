import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import { Routes, RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http'; 
import { HttpClientModule} from "@angular/common/http";


import { ProveedoresService } from './servicios/proveedores.service';
import { PresupuestosService } from './servicios/presupuestos.service';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './header/header.component';
import { AddproveeComponent } from './proveedores/addprovee/addprovee.component';
import { AddpresComponent } from './presupuestos/addpres/addpres.component';
import { PresupuestosComponent } from './presupuestos/presupuestos/presupuestos.component';
import { EditpresComponent } from './presupuestos/editpres/editpres.component';
import { RegistroComponent } from './autenticacion/registro/registro.component';
import { InisesComponent } from './autenticacion/inises/inises.component';
import { GuardService } from './servicios/guard.service';

import { EditprooComponent } from './proveedores/editproo/editproo.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'proveedores', component: ProveedoresComponent , canActivate:[GuardService]},
  { path: 'addprovee', component: AddproveeComponent ,canActivate:[GuardService]},
  { path: 'presupuestos', component: PresupuestosComponent ,canActivate:[GuardService]},
  { path: 'editproo/:id', component: EditprooComponent,canActivate:[GuardService] }, 
  { path: 'addpres', component: AddpresComponent,canActivate:[GuardService] },
  { path: 'editpres/:id', component: EditpresComponent,canActivate:[GuardService] }, 
  { path: 'registro', component: RegistroComponent,canActivate:[GuardService] }, 
  { path: 'iniciosesion', component: InisesComponent,canActivate:[GuardService] }, 
  { path: '**', component: InicioComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProveedoresComponent,
    InicioComponent,
    HeaderComponent,
    AddproveeComponent,
    AddpresComponent,
    PresupuestosComponent,
    EditpresComponent,
    RegistroComponent,
    InisesComponent,
    EditprooComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ],
  providers: [ProveedoresService, PresupuestosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
