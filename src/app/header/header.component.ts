import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private autenticationService: AutenticacionService,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
  }

  isAuth(): Boolean {
    return this.autenticationService.isAuthenticated();
  }

  onLogout() {
    this.autenticationService.logout().then(
      ()=>{
        this.router.navigate(['/iniciosesion'])
      }
    ).catch(
      ()=>{
        //...
      }
    )
  }

}
