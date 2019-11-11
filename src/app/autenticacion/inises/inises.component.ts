import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-inises',
  templateUrl: './inises.component.html',
  styleUrls: ['./inises.component.css']
})
export class InisesComponent implements OnInit {

  userdata: any;
  loginForm: FormGroup;
  mensaje = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private activedRouter: ActivatedRoute, private autService: AutenticacionService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        'email': ['', [
          Validators.required,
          Validators.email]
        ],
        'password': ['', [
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6)]
        ]
      }
    )
  }

  onSubmit() {
    this.saveUserData();
    this.autService.inicioSesion(this.userdata);
    setTimeout(() => {
      if (this.isAuth() === false) {
        this.mensaje = true
      }
    }, 200);

  }

  saveUserData() {
    const saveUserdata = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    this.userdata = saveUserdata;
  }

  isAuth():boolean {
    return this.autService.isAuthenticated();
  }


}
