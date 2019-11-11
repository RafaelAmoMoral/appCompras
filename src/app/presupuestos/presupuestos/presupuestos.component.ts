import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.css']
})
export class PresupuestosComponent implements OnInit {

  presupuestos: any[] = [];

  constructor(private presupuestosService: PresupuestosService) {
    this.getPresupuestos();
  }

  getPresupuestos() {
    this.presupuestosService.getPresupuestos()
      .subscribe(presupuestos => {
        for (let id$ in presupuestos) {
          const p = presupuestos[id$];
          p.id$ = id$;
          this.presupuestos.push(presupuestos[id$]);
        }
      })
  }

  eliminarPresupuesto(id$) {
    this.presupuestosService.delPresupuesto(id$).subscribe(
      res => {
        this.presupuestos = []; //Borro los datos cargados previamente.
        this.getPresupuestos();
      }
    )
  }

  ngOnInit() {

  }

}
