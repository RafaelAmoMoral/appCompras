import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../servicios/proveedores.service';
import * as _ from "lodash";

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  proveedores: any[] = [];
  itemsPerPage = 4;
  nextKey: any; 
  prevKeys: any[] = []; 
  cargando: boolean = true;
  displayError: boolean = false;

  constructor(private proveedoresService: ProveedoresService) {
    this.getProveedores();
  }

  ngOnInit() {
  }

  nextPage() {
    this.cargando=true;
    this.prevKeys.push(_.first(this.proveedores)['$key']) // set current key as pointer for previous page
    this.getProveedores(this.nextKey)
  }

  prevPage() {
    this.cargando=true;
    const prevKey = _.last(this.prevKeys) // use last key in array
    this.prevKeys = _.dropRight(this.prevKeys) // then remove the last key in the array
    this.getProveedores(prevKey)
  }

  getProveedores(key?) {
    this.proveedoresService.getRangeOfProveedores(this.itemsPerPage, key).then(
      snapshot => {
        if (snapshot) {
          this.proveedores=[];
          snapshot.forEach(element => {
            let p=element.exportVal();
            p.id$=element.key;
            this.proveedores.push(p);
          });
          /*Dado que pido un objeto más cuyo id será la key con la que generaré la consulta de siguiente página,
          elimino el ultimo presupuesto.*/
          let lastItem: any = this.proveedores.pop();

          /*Si la cantidad de elementos de esta página es inferior al del número total de elementos por página,
          añado el elemento que anteriormente elimine del array.
          Y además igualo a null la variable nextKey
          Sino simplemente igualo la variable nextKey al id$ del lastItem*/

          if (this.proveedores.length < this.itemsPerPage) {
            if(lastItem){
              this.proveedores.push(lastItem);
            }
            this.nextKey = null;
          } else {
            this.nextKey = lastItem.id$;
          }
          this.cargando = false;
          this.displayError = false; //Meter error en variable
        } else {
          this.cargando = false;
          this.displayError = true; //Meter error en variable
        }
      },
      error => {
        this.cargando = false;
        this.displayError = false;
      }
    )
  }

  eliminarProveedor(id$) {
    this.cargando=true;
    this.proveedoresService.delProveedor(id$).then(
      res => {
        this.proveedores = [];
        this.getProveedores();
        this.prevKeys = [];
        this.cargando=false;
      }
    ).catch(
      error=>{
        console.log(error);
      }
    )
  }

}
