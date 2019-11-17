import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor() { }


  postProveedor(proveedor: any) {
    return firebase.database().ref('proveedores').push(proveedor);
  }

  getProveedor(id$: string) {
      return firebase.database().ref(`proveedores/${id$}`).once('value');
  }

  //https://comprasapp-46746.firebaseio.com/Proveedores.json?orderBy="$key"&startAt="<Id del inicio>"&limitToFirst=<Cantidad de elementos>&print=pretty
  getRangeOfProveedores(offset: number, startKey?){
      let ref=firebase.database().ref('proveedores').orderByKey().startAt(`${startKey==undefined?"":startKey}`).limitToFirst(offset+1);
      return ref.once('value');
  }

  putProveedor(proveedor: any, id$: string):Promise<any> {
    return firebase.database().ref(`proveedores/${id$}`).set(proveedor);
  }

  delProveedor(id$: string) {
    return firebase.database().ref(`proveedores/${id$}`).remove();
  }

}
