import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PresupuestosService } from '../../servicios/presupuestos.service';

@Component({
  selector: 'app-addpres',
  templateUrl: './addpres.component.html',
  styleUrls: ['./addpres.component.css']
})
export class AddpresComponent implements OnInit {

  presupuestoForm: FormGroup;
  presupuesto: any;
  base: number;
  tipo: number;
  iva: number = 0;
  total: number = 0;

  constructor(private pf: FormBuilder, private presupuestoService: PresupuestosService) { }

  ngOnInit() {
    this.presupuestoForm = this.pf.group(
      {
        proveedor: ['', Validators.required],
        fecha: ['', Validators.required],
        concepto: ['',[ Validators.required, Validators.minLength(10)]],
        base: ['', [Validators.required, Validators.min(0)]],
        tipo: ['', Validators.required],
        iva: this.iva,
        total: this.total
      });
    this.onChanges();
  }

  onSubmit() {
    this.presupuesto = this.savePresupuesto();
    this.presupuestoService.postPresupuesto(this.presupuesto)
    .subscribe(newpres =>{
      console.log(newpres);
    });
    this.presupuestoForm.reset();
  }

  onChanges(): void {
    this.presupuestoForm.valueChanges.subscribe(valor => {
      this.base = valor.base;
      this.tipo = valor.tipo;
      this.presupuestoForm.value.iva = this.base * this.tipo;
      this.presupuestoForm.value.total = this.base + (this.base * this.tipo);
    });
  }

  savePresupuesto() {
    const savePresupuesto = {
      proveedor: this.presupuestoForm.get('proveedor').value,
      fecha: this.presupuestoForm.get('fecha').value,
      concepto: this.presupuestoForm.get('concepto').value,
      base: this.presupuestoForm.get('base').value,
      tipo: this.presupuestoForm.get('tipo').value,
      iva: this.presupuestoForm.get('iva').value,
      total: this.presupuestoForm.get('total').value
    };
    return savePresupuesto;
  }

}
