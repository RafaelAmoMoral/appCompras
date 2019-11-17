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
        databaseURL: "https://comprasapp-46746.firebaseio.com",
        projectId: "comprasapp-46746",
        storageBucket: "comprasapp-46746.appspot.com",
        messagingSenderId: "717073356752",
        appId: "1:717073356752:web:e5f3266e6e953a1ecb8bd5",
        measurementId: "G-TKR95BNBDK"
      });
  }

} 
