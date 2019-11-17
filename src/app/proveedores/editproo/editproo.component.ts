import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';

@Component({
  selector: 'app-editproo',
  templateUrl: './editproo.component.html',
  styleUrls: ['./editproo.component.css']
})
export class EditprooComponent implements OnInit {
  @ViewChild('formpro', { static: false }) formpro: NgForm;

  id:string;
  proveedor:any;

  provincias: string[] = [
    'Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona',
    'Burgos', 'Cáceres', 'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba',
    'La Coruña','Cuenca','Gerona','Granada','Guadalajara',
    'Guipúzcoa','Huelva','Huesca','IslasBaleares','Jaén','León','Lérida','Lugo',
    'Madrid', 'Málaga','Murcia','Navarra','Orense','Palencia','Las Palmas',
    'Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
    'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya',
    'Zamora','Zaragoza' ]

  constructor(private proveedoresService:ProveedoresService,
     private router: Router, private activatedRouter: ActivatedRoute) { 
    this.activatedRouter.params.subscribe(parametros => {
      this.id = parametros['id'];
      this.proveedoresService.getProveedor(this.id).then(
        proveedor => {
          this.proveedor=proveedor.val();
          this.formpro.setValue(proveedor.val());
        }
      )
    });
  }

  ngOnInit() {
  }

  onSubmit(){
    this.proveedor.nombre = this.formpro.value.nombre;
    this.proveedor.cif = this.formpro.value.cif;
    this.proveedor.direccion = this.formpro.value.direccion;
    this.proveedor.cp = this.formpro.value.cp;
    this.proveedor.localidad = this.formpro.value.localidad;
    this.proveedor.provincia = this.formpro.value.provincia;
    this.proveedor.telefono = this.formpro.value.telefono;
    this.proveedor.email = this.formpro.value.email;
    this.proveedor.contacto = this.formpro.value.contacto;
    this.proveedoresService.putProveedor(this.proveedor,this.id).then(
      added=>this.router.navigate(['/proveedores'])
      )
  }

}
