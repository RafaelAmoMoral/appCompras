import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp(
      {
        apiKey: "AIzaSyDAix0Td9aBRV0YVrHPFQioDCAbecNawlo",
        authDomain: "comprasapp-46746.firebaseapp.com",
      });
  }

} 
