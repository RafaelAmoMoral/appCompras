import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot
  ,RouterStateSnapshot} from '@angular/router';
import {AutenticacionService} from '../servicios/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {


  constructor(private autenticationService:AutenticacionService) { }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean{
    return this.autenticationService.isAuthenticated();
  }

}
