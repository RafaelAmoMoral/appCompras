import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import * as _ from 'lodash'; 

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.css']
})
export class PresupuestosComponent implements OnInit {

  presupuestos: any[] = [];
  nextKey: any; // lastItem in list 
  prevKeys: any[] = []; // for prev button
  itemsPerPage: number = 4;
  cargando: boolean = true;
  displayError = false;

  constructor(private presupuestosService: PresupuestosService) {
    this.getPresupuestos();
  }

  ngOnInit() { }



  eliminarPresupuesto(id$) {
    this.presupuestosService.delPresupuesto(id$).subscribe(
      res => {
        this.presupuestos = [];
        this.getPresupuestos();
        this.prevKeys = []
      }
    )
  }

  nextPage() {
    this.prevKeys.push(_.first(this.presupuestos)['$key'])
    this.getPresupuestos(this.nextKey)

  }

  prevPage() {
    const prevKey = _.last(this.prevKeys);
    this.prevKeys = _.dropRight(this.prevKeys);
    this.getPresupuestos(prevKey);
  }

  private getPresupuestos(key?) {
    this.cargando = true;
    this.presupuestosService.getRangeOfPresupuestos(this.itemsPerPage, key)
      .subscribe(pres => {
          if (pres) {
            this.presupuestos = []; // Elimino la página previa
            for (let id$ in pres) { // Recorro los elementos y los añado a la nueva página
              const p = pres[id$];
              p.id$ = id$;
              this.presupuestos.push(pres[id$]);
            }

            /*Dado que pido un objeto más cuyo id será la key con la que generaré la consulta de siguiente página.
            elimino el ultimo presupuesto.*/
            let lastItem: any = this.presupuestos.pop();

            /*Si la cantidad de elementos de esta página es inferior al del número total de elementos por página,
            añado el elemento que anteriormente elimine del array y lo añado.
            Y además igualo a null la variable nextKey
            Sino simplemente igualo la variable nextKey al id$ del lastItem*/

            if (this.presupuestos.length < this.itemsPerPage) {
              if(lastItem){
                this.presupuestos.push(lastItem);
              }
              this.nextKey = null;
            } else {
              this.nextKey = lastItem.id$;
            }
            this.cargando = false;
          } else {
            this.cargando = false;
            this.displayError=true; //Meter error en variable
          }
        },
        error => {
          this.cargando = false
          this.displayError=true; //Meter error en variable
        })
  }

  closeError(){
    this.displayError=false;
  }

}
