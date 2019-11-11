import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { map } from 'rxjs/operators/';


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

    return this.http.post(this.presURL, newPres, { headers }).pipe( // recomiendan usar pipes ya que puedes concatenar operadores.
      map(res => {
        return res.json(); // De esta forma cada respuesta la modificamos y convertimos a json
      }))
  }

  getPresupuestos() {
    return this.http.get(this.presURL).pipe(
      map(res => res.json())
    )
  }

  getPresupuesto(id$: string) {
    const url = `${this.preURL}/${id$}.json`;
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
