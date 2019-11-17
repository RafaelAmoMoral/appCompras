import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { map } from 'rxjs/operators/';
import {Observable} from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {

  presURL: string = 'https://comprasapp-46746.firebaseio.com/presupuestos.json';
  preURL: string = 'https://comprasapp-46746.firebaseio.com/presupuestos';

  constructor(private http: Http) { }

  postPresupuesto(presupuesto: any) {
    const newPres = JSON.stringify(presupuesto); // presupuesto es un JSON
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    /*Gracias a pipe y al operador map, podemos transformar el flujo de datos a nuestra conveniencia*/
    return this.http.post(this.presURL, newPres, { headers }).pipe(
      map(res => res.json())
    )
  }

  getPresupuesto(id$: string) {
    const url = `${this.preURL}/${id$}.json`;
    return this.http.get(url).pipe(
      map(res => res.json()));
  }


  //'https://comprasapp-46746.firebaseio.com/presupuestos.json?orderBy="$key"&startAt="b"&limitToFirst="b\uf8ff"&print=pretty'
  // https://comprasapp-46746.firebaseio.com/presupuestos.json?orderBy="$key"&startAt="-LsTqG2CUxyd6dsMIYzP"&limitToFirst="-LtQxWjHDM0zVi5bkbRq"
  getRangeOfPresupuestos(offset: number, startKey?){
    const url = `${this.presURL}?orderBy="$key"&startAt="${startKey==undefined?"":startKey}"&limitToFirst=${offset+1}`;
    return this.http.get(url).pipe(
      map(res => res.json()));
      }

  putPresupuesto(presupuesto: any, id$: string) {
    const newpre = JSON.stringify(presupuesto); const headers = new Headers({ 'Content-Type': 'application/json' });
    const url = `${this.preURL}/${id$}.json`;
    return this.http.put(url, newpre, { headers }).pipe(
      map(res => {
        console.log(res.json());
        return res.json();
      })
    );
  }

  delPresupuesto(id$: string) {
    const url = `${this.preURL}/${id$}.json`;
    return this.http.delete(url).pipe(
      map(res => res.json())
    );
  }
}
