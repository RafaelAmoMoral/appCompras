import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot
  , RouterStateSnapshot
} from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {


  constructor(private autenticationService: AutenticacionService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let myRoute: string = route.url.join('');
    let access: boolean = false;
    if(this.autenticationService.isAuthenticated()){
      if (myRoute === 'iniciosesion' || myRoute == 'registro') {
        access=false;
      }else{
        access=true;
      }
    }else{
      if (myRoute === 'iniciosesion' || myRoute == 'registro') {
        access=true;
      }else{
        access=false;
      }
    }
    return access;
  }

}
