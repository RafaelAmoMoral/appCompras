import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  erroresForm = {
    'email': '',
    'password': ''
  }
  mensajesValidacion = {
    'email': {
      'required': 'Email obligatorio',
      'email': 'Introduzca una dirección email correcta'
    },
    'password': {
      'required': 'Contraseña obligatoria',
      'pattern': 'La contraseña debe tener al menos una letra un número ',
      'minlength': 'y más de 6 caracteres'
    }
  }



  form: FormGroup;
  register: any;
  registered: boolean = false;
  error: string;
  displayError: boolean = false;

  constructor(private formBuilder: FormBuilder, private autService: AutenticacionService,
    private router: Router, private activatedRouter: ActivatedRoute) {
    this.register = [];
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required,
      Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
      Validators.minLength(6)]]
    });
    this.form.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (data) {
      if (!this.form) { return; }
      const form = this.form;
      for (const field in this.erroresForm) {
        this.erroresForm[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.mensajesValidacion[field];
          for (const key in control.errors) {
            this.erroresForm[field] += messages[key] + ' ';
          }
        }
      }
    } else {
      this.form.valueChanges.subscribe(
        data => {
          this.register.email = data.email;
          this.register.password = data.password;
          console.log(data);
        }
      );
    }
  }

  onSubmit() {
    this.register = this.saveUserdata();
    this.autService.registroUsuario(this.register).then(
      userCredential => this.router.navigate(['/inicio'])
    ).catch(
      error => { //Introducir un usuario ya registrado
        this.error = error
        this.displayError = true;
      }
    )
  }

  saveUserdata() {

    const saveUserdata = {
      email: this.form.get('email').value,
      password: this.form.get('password').value,
    };
    return saveUserdata;
  }

}
