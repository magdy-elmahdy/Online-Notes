import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogged =localStorage.getItem('TOKEN');

  constructor(private _Router:Router , public _AuthService:AuthService) {
    
   }

  logout(){
    localStorage.clear();
    this._Router.navigate(['/signin']);
    
  }
  
  ngOnInit(): void {
  }

}